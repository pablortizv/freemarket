'use client';
import React, { useState } from 'react';
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from '@/redux/features/productSlice'
import Image from 'next/image';

// Definición de la interfaz para los valores del formulario del producto
interface ProductFormValues {
  id:string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
}

// Valores iniciales para el formulario del producto
const initialForm = {
  id:'',
  name: '',
  description: '',
  price: 0,
  rating: 0,
  quantity: 0,
  images: ['', '', ''],
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormValues>(initialForm);
  const dispatch = useAppDispatch()

  // Función para validar si las URLs de las imágenes son HTTPS y terminan en .jpeg, .jpg, .gif o .png
  const isHttpsImageUrl = (urls: string[]) => {
    var result = false
    urls.map((url: string) => {
      result = url.match(/^https:.*\.(jpeg|jpg|gif|png)$/) != null
    })
    return result
  }
  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name.includes("images")) {
      let id = Number(e.target.name.replace('images', ''));
      let newImages = [...formData.images];
      newImages[id] = e.target.value;
      setFormData({
        ...formData,
        images: newImages
      });
    }
    else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }

  };
// Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isHttpsImageUrl(formData.images)) {
      dispatch(addProduct(formData))
      setFormData(initialForm)
      alert("Producto agregado correctamente")
    } else {
      alert("Url no válida")
    }
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto flex p-10 items-center">
      <div className="w-full lg:w-1/2 mx-auto">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label className="font-bold text-lg mb-2">SKU</label>
          <input className="border p-2 text-black" type="text" name="id" placeholder="SKU" value={formData.id} onChange={handleChange} required />
          <label className="font-bold text-lg mb-2">Nombre</label>
          <input className="border p-2 text-black" type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
          <label className="font-bold text-lg mb-2">Descripción</label>
          <textarea className="border p-2 text-black" name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
          <label className="font-bold text-lg mb-2">Precio</label>
          <input className="border p-2 text-black" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} required />
          <label className="font-bold text-lg mb-2">Cantidad</label>
          <input className="border p-2 text-black" type="number" name="quantity" placeholder="Cantidad" value={formData.quantity} onChange={handleChange} required />
          <label className="font-bold text-lg mb-2">URL de imagen 1</label>
          <input className="border p-2 text-black" type="text" name="images0" placeholder="URL de imagen 1" value={formData.images[0]} onChange={handleChange} required />
          <label className="font-bold text-lg mb-2">URL de imagen 2</label>
          <input className="border p-2 text-black" type="text" name="images1" placeholder="URL de imagen 2" value={formData.images[1]} onChange={handleChange} required />
          <label className="font-bold text-lg mb-2">URL de imagen 3</label>
          <input className="border p-2 text-black" type="text" name="images2" placeholder="URL de imagen 3" value={formData.images[2]} onChange={handleChange} required />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Enviar</button>
        </form>
      </div>
      <div>
        <Image
          src="/mascota.png"
          width={250}
          height={250}
          className="hidden md:block pet"
          alt="Mascota de freemarket"
        />
      </div>
    </div>
  );
};

export default ProductForm