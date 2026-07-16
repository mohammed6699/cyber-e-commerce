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
        console.log('product added to cart');
        this.cartItems.update((items) => [...items, product]);
        localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    }
    // delete product from cart
    deleteCartItem(id:number): void {
        this.cartItems.update((items) => items.filter((item) => item.id !== id))
        localStorage.setItem('cart', JSON.stringify(this.cartItems()));
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
        this.cartItems.set(JSON.parse(localStorage.getItem('cart') || '[]'));
        return this.cartItems();
    }
    // get cart count
    getCartCount(): number {
        return this.cartItems().length;
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