import { computed, Injectable, signal } from "@angular/core";
import { ProductModel } from "../Models/Product.model";

@Injectable({
    providedIn: 'root'
})
export class WishListService {
    private readonly wishlistItems = signal<ProductModel[]>(this.loadWishList());
    readonly items = this.wishlistItems.asReadonly();

    // add to wishlist
    addToWishlist(product: ProductModel): void {
        // check if the item already exists to prevent dublicate
        const isItemExists = this.wishlistItems().some((item) => item.id === product.id);
        if (isItemExists) {
            return;
        }
        this.wishlistItems.update((items) => [...items, product]);
        localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems()));
    }
    // delete from wishlist
    deleteWishlistItem(id: number): void {
        this.wishlistItems.update((items) => items.filter((item) => item.id !== id));
        localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems()));
    }
    // clear wishlist
    clearWishlist(): void {
        this.wishlistItems.set([]);
        localStorage.removeItem('wishlist');
    }
    // get wishlist items
    getWishlistItems(): ProductModel[] {
        this.wishlistItems.set(JSON.parse(localStorage.getItem('wishlist') || '[]'));
        return this.wishlistItems();
    }
    // get wishlist count
    getWishlistCount(): number {
        return this.wishlistItems().length;
    }
    // add function to make sure data return from lacal dtorage after reload
    private loadWishList(): ProductModel[] {
        const savedWishList = localStorage.getItem('wishlist')
        return savedWishList ? JSON.parse(savedWishList) : []
    }
    // function to manage add and delete to and from wishlist
    toogleWishList(product: ProductModel): void{
        this.wishlistItems.update((items) => {
            const isExists = items.find(item => item.id === product.id);
            const newItem = isExists ? items.filter(item => item.id !== product.id) : [...items, product]
            localStorage.setItem('wishlist', JSON.stringify(newItem));
            return newItem

        });

    }
}