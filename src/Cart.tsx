import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Book, BookRow } from './Book'

export const Cart = (item: any) => {

	const [view, setView] = useState<boolean>(false)

	const updateSessionCart = async (items: any) => {

		if (Object.keys(items).length !== 0) {
			const response = await fetch(`/v1/api/updateclientcart`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(items)
			});
		}
	}

	useEffect(() => { updateSessionCart(item.cartitems) });

	return (
		<>
			<div className='fixed top-0 left-0 right-0 p-2 bg-blue-800 z-10 flex items-center'>
				<button onClick={() => setView(true)}><FaShoppingCart className='text-2xl text-white' /></button>
				<span className='ml-2 font-bold bg-red-500 text-white w-[25px] h-[25px] rounded-full flex items-center justify-center'>
					<span>{item.count}</span>
				</span>
			</div>
			{view && <div className='z-50 absolute top-0 left-0 right-0 bottom-0 bg-black/50 overflow-auto grid place-items-center'>
				<div className='bg-blue-200 shadow-lg flex flex-col w-[80%] p-5'>
					{item.items?.filter((book: any, index: number) => item.cartitems[book.isbn]).map((book: any) => <BookRow {...book} count={item.cartitems[book.isbn]} minus={item.minus} plus={item.plus} trash={item.count} />)}
					<button className='p-2 m-2 bg-red-500 text-white' onClick={() => setView(false)}>Закрыть</button>
				</div>
			</div>}
		</>
	)
}
