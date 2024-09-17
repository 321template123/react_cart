import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BounceLoader } from 'react-spinners';
import { Book } from './Book';
import { FaShoppingCart } from "react-icons/fa";
import { Cart } from './Cart';

export const InfiniteScroll = () => {
	const [items, setItems] = useState<any>([]);
	const [cartitems, setCartItems] = useState<any>({});
	const [count, setCount] = useState<number>(0);
	const [pageNumber, setPageNumber] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchItems = async () => {
			setLoading(true);
			const response = await fetch(`/v1/api/product?page=${pageNumber}`);
			const data = await response.json();
			const responsecart = await fetch(`/v1/api/getclientcart`)
				.then(data => data.json())
				.then(data => {
					setCartItems(data)
					let sum = 0
					Object.keys(data).map(key => sum += data[key])
					setCount(sum)
				})
				.catch(err => console.log(err));
			setItems([...items, ...data]);
			setHasMore(true);
			setLoading(false);
		};
		fetchItems();
	}, [pageNumber]);

	const handleScroll = () => {
		const scrollPosition = window.innerHeight + window.scrollY;
		const documentHeight = document.getElementById("list")?.clientHeight ?? 0;
		if (scrollPosition >= documentHeight - 100 && hasMore && !loading) {
			setPageNumber(pageNumber + 1);
		}
	};

	const plus = (isbn: string) => {
		let buffer: any = cartitems
		if (!buffer[isbn]) {
			buffer[isbn] = 0
		}
		buffer[isbn]++
		setCount(count + 1)
		setCartItems(buffer)
	}

	const minus = (isbn: string) => {
		let buffer: any = cartitems
		if (buffer[isbn] && buffer[isbn] != 0) {
			buffer[isbn]--
			setCount(count - 1)
			setCartItems(buffer)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [hasMore, loading, pageNumber]);

	return (
		<div className='grid grid-cols-3 bg-blue-400 w-full pt-[50px]' id='list'>
			<Cart count={count} items={items} cartitems={cartitems} minus={minus} plus={plus}></Cart>
			{items.map((item: any, index: number) => <Book key={index} {...item} count={cartitems[item.isbn]} minus={minus} plus={plus} trash={count} />)}
			{loading && <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 grid place-items-center'>
				<div className='p-5 bg-blue-200 shadow-xl rounded-xl'>
					<BounceLoader size={120} />
				</div>
			</div>}
			{!hasMore && <p>No more items</p>}
		</div>
	);
}
