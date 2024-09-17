import React, { useEffect, useState } from 'react'
import { FaPlus, FaMinus, FaM } from 'react-icons/fa6'
export const Book = (item: any) => {

	const [imageSrc, setImageSrc] = useState(item.image);
	const [error, setError] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.src = item.image;
		img.onload = () => {
			setImageSrc(item.image);
			setError(false);
		};
		img.onerror = () => {
			setImageSrc("https://png.pngtree.com/png-clipart/20210308/original/pngtree-hand-drawn-cartoon-books-pile-elements-png-image_5752258.jpg");
			setError(true);
		};
	}, [item.image]);

	return (
		<div className='relative m-2 p-2 h-[300px] shadow-lg border bg-blue-300 border-blue-500 rounded-xl flex flex-col justify-center items-center'>
			<span>{item.isbn}</span>
			<span>{item.author}</span>
			<span>{item.title}</span>
			<span className='text-center mt-2'>{item.description}</span>
			<img
				src={imageSrc}
				className="w-[50px] h-[50px]"
			/>
			<div className='flex items-center justify-center'>
				<button className='m-2 p-2 rounded bg-red-500' onClick={() => item.minus(item.isbn)}><FaMinus></FaMinus></button>
				{Boolean(item.count) && item.count}
				<button className='m-2 p-2 rounded bg-green-500' onClick={() => item.plus(item.isbn)}><FaPlus></FaPlus></button>
			</div>
		</div>
	)
}

export const BookRow = (item: any) => {

	const [imageSrc, setImageSrc] = useState(item.image);
	const [error, setError] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.src = item.image;
		img.onload = () => {
			setImageSrc(item.image);
			setError(false);
		};
		img.onerror = () => {
			setImageSrc("https://png.pngtree.com/png-clipart/20210308/original/pngtree-hand-drawn-cartoon-books-pile-elements-png-image_5752258.jpg");
			setError(true);
		};
	}, [item.image]);

	return (
		<div className='relative m-2 p-2 w-full shadow-lg border bg-blue-300 border-blue-500 rounded-xl flex justify-center items-center'>
			<span className='justify-self-start'>{item.author}</span>
			<span className='justify-self-start'>{item.title}</span>
			<div className='flex items-center justify-center'>
				<button className='m-2 p-2 rounded bg-red-500' onClick={() => item.minus(item.isbn)}><FaMinus></FaMinus></button>
				{Boolean(item.count) && item.count}
				<button className='m-2 p-2 rounded bg-green-500' onClick={() => item.plus(item.isbn)}><FaPlus></FaPlus></button>
			</div>
		</div>
	)
}
