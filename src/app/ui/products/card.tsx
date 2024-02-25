import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from "@/redux/hooks";
import { select, addToCart } from '@/redux/features/productSlice'
import Modal from '@/app/ui/modal';


interface Product {
    id: string;
    images: string[];
    name: string;
    price: number;
    rating: number;
    description:string;
    quantity: number
  }
  
  interface ProductCardProps {
    product: Product;
  }

  const CardProduct: React.FC<ProductCardProps> = ({ product }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useAppDispatch()

    const addProduct = (product: object) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addToCart(product))
        setModalOpen(true)
    }

    const handleClose = ()=> {
        setModalOpen(!modalOpen)
      }
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg m-2">
            <Link href={'/product'} onClick={() => dispatch(select(product))}>
            <div>
            <Image
                src={product.images[0]}
                width={1000}
                height={760}
                alt="Screenshots of the dashboard project showing desktop version"
            />
            </div>
            <div className="flex flex-row">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-100 text-base">
                    Precio: ${product.price}
                </p>
                <p className="text-gray-100 text-base">
                    Calificación: {product.rating}
                </p>
            </div>
            <div className="px-6 py-4 basis-1/2">
                <button onClick={addProduct(product)} className="bg-green-500 text-white px-4 py-2 rounded">Agregar al carrito</button>
            </div>
            </div>
            </Link>
            <Modal open={modalOpen} handleClose={handleClose} />
        </div>
    )
}

export default CardProduct;