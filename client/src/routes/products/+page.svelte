<script lang="ts">
    import Product from '../components/Product.svelte';

    export let data;
    let currentPage = data.page;
    let currentMinPrice = data.minPrice;
    let currentMaxPrice = data.maxPrice;

    const updateUrl = () => {
        const params = new URLSearchParams();
        params.set('page', currentPage.toString());
        params.set('minPrice', currentMinPrice.toString());
        params.set('maxPrice', currentMaxPrice.toString());
        window.location.search = params.toString();
    };

    const onPaginationChange = (newPage) => {
        currentPage = newPage;
        updateUrl();
    };

    const onPriceFilterChange = () => {
        updateUrl();
    };
</script>

<main>
    <h1>Products</h1>

    <div class="filters">
        <label>
            Min Price:
            <input type="number" bind:value={currentMinPrice} on:change={onPriceFilterChange} />
        </label>
        <label>
            Max Price:
            <input type="number" bind:value={currentMaxPrice} on:change={onPriceFilterChange} />
        </label>
    </div>

    <ul class="product-list">
        {#each data.products as P }
            <li>
                <Product {P} />
            </li>
        {/each}
    </ul>

    <div class="pagination">
        {#if data.pagination.page > 1}
            <button on:click={() => onPaginationChange(data.pagination.page - 1)}>Previous</button>
        {/if}
        {#if data.pagination.page < data.pagination.pageCount}
            <button on:click={() => onPaginationChange(data.pagination.page + 1)}>Next</button>
        {/if}
    </div>
</main>

<style>
    main {
        padding: 2rem;
        font-family: 'Arial', sans-serif;
    }
    .filters {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    label {
        display: flex;
        flex-direction: column;
        font-weight: bold;
    }
    input {
        padding: 0.5rem;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        margin-top: 0.5rem;
    }
    .product-list {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
    }
    .pagination {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 8px;
        background-color: #0070f3;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    button:hover {
        background-color: #005bb5;
    }
</style>
