import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    var result = await fetch("https://dummyjson.com/products");
    var jsonData = await result.json();
    console.log(jsonData.products.length);
    setProducts(jsonData.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setPageHandler = (pageNo) => {
    setPage(pageNo);
  };

  const setPrevPage = () => {
    setPage(page - 1);
  };

  const setNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <div>
        {products?.slice(page * 10 - 10, page * 10).map((item) => (
          <div>
            <span>
              <img src={item.images[0]} alt={item.title} />{" "}
            </span>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      <div>
        <span onClick={() => setPrevPage()}>prev</span>

        <span>
          {[...Array(products.length / 10)].map((_, i) => (
            <span onClick={() => setPageHandler(i + 1)}>{i + 1}</span>
          ))}
        </span>
        <span onClick={() => setNextPage()}>next</span>
      </div>
    </div>
  );
}
