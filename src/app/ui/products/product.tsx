'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from '@/redux/features/productSlice';
import Modal from '@/app/ui/modal';

export default function Product() {
  const [currentImage, setCurrentImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const productSelected = useAppSelector(state => state.productReducer.productSelected)
  const dispatch = useAppDispatch()

  const handleClose = ()=> {
    setModalOpen(!modalOpen)
  }
  const addProduct = (productSelected: object) => {
    dispatch(addToCart(productSelected))
    setModalOpen(true)
    
  }
  return (
    <div className="flex flex-col items-center p-10 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto ">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-1/2">
          <img className="w-full" src={productSelected.images[currentImage]} alt={productSelected.name} />
          <div className="grid grid-cols-3 gap-2 w-full mt-4">
            {productSelected.images.map((image: string | undefined, index: number) => (
              <button key={index} onClick={() => setCurrentImage(index)}>
                <img className="w-full" src={image} alt={productSelected.name} />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2 w-full lg:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{productSelected.name}</h1>
          <p className=''>{productSelected.description}</p>
          <p>Precio: ${productSelected.price}</p>
          <p>Cantidad: {productSelected.quantity}</p>
          <p>SKU: {productSelected.id}</p>
          <p>Calificación: {productSelected.rating}</p>
          <button onClick={() => addProduct(productSelected)} className="bg-green-500 text-white px-4 py-2 rounded">Agregar al carrito</button>
        </div>
      </div>
      <Modal open={modalOpen} handleClose={handleClose} />
    </div>
  );
};
