import { useEffect, useState } from "react";
import Form from "./Form";
import Table from "./Table";
import { getData, deleteData, postData, putData } from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [openForm, setopenForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [initialForm, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await getData();
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteData(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const addProduct = async (product) => {
    let data = {
      name: product.name,
      price: product.price,
      category: product.category,
    };

    if (edit) await putData(product.id, data);
    else await postData(data);
    getProducts();
    setopenForm(false);
  };

  const editProduct = async (data) => {
    setForm(data);
    setopenForm(true);
    setEdit(true);
  };

  const showForm = () => {
    setopenForm(true);
    setForm({
      name: "",
      price: "",
      category: "",
    });
    setEdit(false);
  };

  const closeForm = () => {
    setopenForm(false);
  };

  return (
    <div className="wrapper m-5 w-50">
      <h2 className="text-primary">CRUD Operations</h2>
      <button
        className="btn btn-primary"
        onClick={() => {
          showForm();
        }}
      >
        Add Product
      </button>
      <Table
        products={products}
        deleteProduct={deleteProduct}
        editProduct={editProduct}
      ></Table>
      {openForm && (
        <Form close={closeForm} data={initialForm} add={addProduct}></Form>
      )}
    </div>
  );
}

export default App;