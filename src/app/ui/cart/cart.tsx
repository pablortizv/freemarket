'use client'
import React, { useEffect, useState } from 'react';
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, removeFromCart, quitFromCart } from '@/redux/features/productSlice';


const Cart = ({ }) => {
  const [total, setTotal] = useState(0)
  const products = useAppSelector(state => state.productReducer.cart)
  const dispatch = useAppDispatch()

  useEffect(() => {
    fnTotal()
  }, [products])
  
  const fnTotal = () => {
    var initialValue = 0;
    products.map((product: any, index: any)=>{
      initialValue += (product.price * product.quantity)
    })
    setTotal(initialValue)
  }
  return (
    <div className="grid max-w-8xl lg:grid-cols-12 lg:gap-12 items-start px-4 mx-auto py-6">
      <div className="lg:col-span-8">
        <div className="flex items-center justify-between pb-4 mb-4 border-b lg:p-8">
          <h1 className="text-2xl font-semibold">Productos</h1>
          <Link className="flex items-center underline" href="/">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Continuar comprando
          </Link>
        </div>

        {products.map((product: any, index: any) => (
          <div className="grid gap-4" key={index}>
            <div className="flex items-start gap-4">
              <div className="grid gap-1.5">
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-sm leading-none">SKU: {product.id}</p>
              </div>
              <div className="grid gap-1.5 ml-auto text-right">
                <div className="flex items-center gap-2 text-2xl font-bold">
                  ${product.price}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <button className="rounded-full w-6 h-6" onClick={()=> dispatch(removeFromCart(product))}>
                    <MinusIcon className="w-4 h-4" />
                    <span className="sr-only">Quitar producto</span>
                  </button>
                  <input className="w-12 text-center text-black" readOnly type="number" value={product.quantity} />
                  <button className="rounded-full w-6 h-6" onClick={()=> dispatch(addToCart(product))}>
                    <PlusIcon className="w-4 h-4" />
                    <span className="sr-only">Agregar producto</span>
                  </button>
                  <button className="rounded-full w-6 h-6" onClick={()=> dispatch(quitFromCart(product))}>
                    <TrashIcon className="w-4 h-4" />
                    <span className="sr-only">Remove item</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t" />
          </div>
        ))}


      </div>
      <div className="col-span-4 lg:p-8 sm:pt-10">
        <div className="text-2xl font-semibold">Resumen de compra</div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>${(total * .85).toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Envío</span>
            <span>Gratis</span>
          </div>
          <div className="flex items-center justify-between">
            <span>IVA</span>
            <span>${(total * .15).toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total</span>
            <span>${(total).toFixed(2)}</span>
          </div>
          <button className="w-full bg-green-500">Pagar</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;


function ArrowLeftIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function MinusIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

function PlusIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function TrashIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
