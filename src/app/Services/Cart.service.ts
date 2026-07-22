import { computed, Injectable, signal } from "@angular/core";
import { ProductModel } from "../Models/Product.model";

@Injectable({
    providedIn: 'root'
})
export class CartService{
    private readonly cartItems = signal<ProductModel[]>(this.loadCartData());
    readonly items = this.cartItems.asReadonly();

    readonly cartCount = computed(() => this.items().reduce((total, item) => total + (item.quantity || 1), 0));
    readonly cartTotalAmount = computed(() => this.items().reduce((total, item) => total + (item.price * (item.quantity || 1)), 0));
    // add to cart
    addToCart(product: ProductModel): void {
        // solve the qty bug
        this.cartItems.update((items) => {
            const existingItem = items.find(i => i.id === product.id);
            if(existingItem){
                return items.map(i => i.id === product.id ? {...i, quantity: (i.quantity || 1) + 1} : i);
            }
            return [...items, {...product, quantity: 1}];
        });
        localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    }
    // delete product from cart
    deleteCartItem(id:number): void {
        this.cartItems.update((items) => items.filter((item) => item.id !== id))
        localStorage.setItem('cart', JSON.stringify(this.cartItems()));
        localStorage.removeItem('cartDetails');
    }
    // update product cart items
    updateCartItemQuantity(id: number, quantity: number): void {
        this.cartItems.update((items) => items.map((item) => item.id === id ? {...item, quantity} : item))
        localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    }
    // clear cart
    clearCart(): void {
        this.cartItems.set([]);
        localStorage.removeItem('cart');
    }
    // get cart items
    getCartItems(): ProductModel[] {
        return this.items()
    }
    // get cart count
    getCartCount(): number {
        return this.cartCount();
    }
    // get cart total amount
    getCartTotalAmount(): number {
        return this.cartItems().reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    }
    // add function to make sure data return from lacal dtorage after reload
    private loadCartData(): ProductModel[]{
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    }
}