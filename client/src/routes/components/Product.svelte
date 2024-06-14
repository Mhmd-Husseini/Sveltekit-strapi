<script lang="ts">
    export let P;

    // Truncate the product name to a maximum of 30 characters
    const truncatedName = P.attributes.name.length > 18 
        ? `${P.attributes.name.slice(0, 18)}..`
        : P.attributes.name;
</script>

<article class="product">
    <h3>{truncatedName}</h3>
    <img src={P.attributes.image} alt={P.attributes.name} />
    <div><p>{P.attributes.description}</p></div>
    <p>Price: ${P.attributes.price}</p>
    <a href={P.attributes.link} target="_blank" rel="noopener noreferrer">View Product</a>
</article>

<style>
    .product {
        border: 1px solid #e0e0e0;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
    }
    .product:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    img {
        max-width: 100%;
        height: 150px;
        width: 150px;
        display: block;
        margin-bottom: 1rem;
        border-radius: 8px;
    }
    p {
        margin-bottom: 0.5rem;
    }
    a {
        display: inline-block;
        padding: 0.5rem 1rem;
        color: #fff;
        background-color: #0070f3;
        border-radius: 8px;
        text-decoration: none;
        transition: background-color 0.3s;
    }
    a:hover {
        background-color: #005bb5;
    }
    div {
        max-height: 73px;
        overflow: hidden;
    }
</style>
