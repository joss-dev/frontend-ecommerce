export const fetchProducts = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulando un retardo
    const response = await fetch("http://localhost:8081/api/product/");
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    const data = await response.json();
    return data.payload; 
};

export const getProductByID = async (id : string) => {
    await new Promise(resolve => setTimeout(resolve, 3000)); 
    const response = await fetch(`http://localhost:8081/api/product/${id}`);
    
    if (!response.ok) {
        throw new Error("Error al obtener el producto");
    }
    
    const data = await response.json();
    return data.payload; 
};
