import { useEffect, useState } from "react";
import { Button, CategoryList, Layout, ProductCard } from "../../components";
import { ProductCategories, ProductWrapper } from "./../Hamburgers/Hamburgers.style";
import { ProductCardContent, ProductCardPrice } from "../../components/ProductCard/ProductCard.style";
import { TamanhoAppettizers } from "./Appetizer.style";

export default function Appetizers() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [tamanhos, setTamanhos] = useState([]);

  const escolherTamanho = (index: number, price: string) => {
    setTamanhos({ tamanhos, [index]: price });
  };

  const priceFormat = (price: number) => {
    console.log("cai aqui?");

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getCategories = async () => {
    const url = "http://localhost:8000/categories";
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAppetizers = async () => {
    const url = "http://localhost:8000/appetizers";
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length) {
      return;
    }

    return () => {
      getCategories();
    };
  }, []);

  useEffect(() => {
    if (products.length) {
      return;
    }

    return () => {
      getAppetizers();
    };
  }, []);

  return (
    <Layout>
      <h1>Entradinhas</h1>
      <ProductCategories>
        {isLoading ? (
          <p>Carregando</p>
        ) : (
          categories.map((item, index) => (
            <CategoryList key={index} data={item} />
          ))
        )}
      </ProductCategories>
      <ProductWrapper>
        {isLoading ? (
          <p>Carregando</p>
        ) : (
          products.map((product, index) => (
            <ProductCard key={index}>
              <ProductCardContent>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <TamanhoAppettizers>
                  <div>
                    <input type="radio" id={`pequeno_${index}`} value="pequeno"
                      checked={tamanhos[index] === "small"}
                      onChange={() => escolherTamanho(index, "small")}/>
                    <label htmlFor={`pequeno_${index}`}>Pequeno</label>
                  </div>
                  <div>
                    <input type="radio" id={`grande_${index}`} value="grande"
                      checked={tamanhos[index] === "large"}
                      onChange={() => escolherTamanho(index, "large")}/>
                    <label htmlFor={`grande_${index}`}>Grande</label>
                  </div>
                </TamanhoAppettizers>
                <Button onClick={() => {}}>Adicionar</Button>
              </ProductCardContent>
              <ProductCardPrice>
                {priceFormat(product.values[tamanhos[index]])}
              </ProductCardPrice>
              <img src={product.image} alt={product.title} />
            </ProductCard>
          ))
        )}
      </ProductWrapper>
    </Layout>
  );
}
