import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center w-10/12 mx-auto">
                <Link href={'/'}>
                <Image
                    src="/logo.svg"
                    width={40}
                    height={50}
                    className=""
                    alt="Freemarket"
                />
                </Link>
                <div className="flex space-x-4">
                    <Link href={'/cart'}>
                        <button className="bg-green-500 text-white px-4 py-2 rounded hidden md:block">Carrito de compras</button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded block md:hidden">
                        <Image
                    src="/cart.png"
                    width={23}
                    height={40}
                    alt="Freemarket"
                /></button>
                    </Link>
                    <Link href={'/product-registration'}>
                        <button className="bg-green-500 text-white px-4 py-2 rounded">+</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
