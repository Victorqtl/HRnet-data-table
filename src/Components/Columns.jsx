import { ArrowDownUp } from 'lucide-react';

export default function Columns({ handleSort }) {
	return (
		<tr className='border-b-[1px] h-12 hover:bg-[#011f46] hover:text-white'>
			<th className='px-2 text-left align-middle'>
				<button
					onClick={() => handleSort('firstName')}
					className='inline-flex justify-center items-center gap-2 h-10 px-2 rounded-md hover:bg-white hover:text-[#011f46] font-medium'>
					First Name{' '}
					<ArrowDownUp
						className='min-w-4 min-h-4'
						size={16}
					/>
				</button>
			</th>
			<th className='px-2 text-left align-middle'>
				<button
					onClick={() => handleSort('lastName')}
					className='inline-flex justify-center items-center gap-2 h-10 px-2 rounded-md hover:bg-white hover:text-[#011f46] font-medium'>
					Last Name{' '}
					<ArrowDownUp
						className='min-w-4 min-h-4'
						size={16}
					/>
				</button>
			</th>
			<th className='px-2 text-left align-middle'>
				<button
					onClick={() => handleSort('startDate')}
					className='inline-flex justify-center items-center gap-2 h-10 px-2 rounded-md hover:bg-white hover:text-[#011f46] font-medium'>
					Start Date{' '}
					<ArrowDownUp
						className='min-w-4 min-h-4'
						size={16}
					/>
				</button>
			</th>
			<th className='px-2 text-left align-middle'>
				<button
					onClick={() => handleSort('department')}
					className='inline-flex justify-center items-center gap-2 h-10 px-2 rounded-md hover:bg-white hover:text-[#011f46] font-medium'>
					Department{' '}
					<ArrowDownUp
						className='min-w-4 min-h-4'
						size={16}
					/>
				</button>
			</th>
			<th className='px-2 text-left align-middle'>
				<button
					onClick={() => handleSort('dateOfBirth')}
					className='inline-flex justify-center items-center gap-2 h-10 px-2 rounded-md hover:bg-white hover:text-[#011f46] font-medium'>
					Date of Birth{' '}
					<ArrowDownUp
						className='min-w-4 min-h-4'
						size={16}
					/>
				</button>
			</th>
			<th className='px-2 text-left align-middle'>
				<button
					onClick={() => handleSort('street')}
					className='inline-flex justify-center items-center gap-2 h-10 px-2 rounded-md hover:bg-white hover:text-[#011f46] font-medium'>
					Street{' '}
					<ArrowDownUp
						className='min-w-4 min-h-4'
						size={16}
					/>
				</button>
			</th>
			<th className='px-2 text-left align-middle'>
				<button
					onClick={() => handleSort('city')}
					className='inline-flex justify-center items-center gap-2 h-10 px-2 rounded-md hover:bg-white hover:text-[#011f46] font-medium'>
					City{' '}
					<ArrowDownUp
						className='min-w-4 min-h-4'
						size={16}
					/>
				</button>
			</th>
			<th className='px-2 text-left align-middle'>
				<button
					onClick={() => handleSort('state')}
					className='inline-flex justify-center items-center gap-2 h-10 px-2 rounded-md hover:bg-white hover:text-[#011f46] font-medium'>
					State{' '}
					<ArrowDownUp
						className='min-w-4 min-h-4'
						size={16}
					/>
				</button>
			</th>
			<th className='px-2 text-left align-middle'>
				<button
					onClick={() => handleSort('zipCode')}
					className='inline-flex justify-center items-center gap-2 h-10 px-2 rounded-md hover:bg-white hover:text-[#011f46] font-medium'>
					Zip Code{' '}
					<ArrowDownUp
						className='min-w-4 min-h-4'
						size={16}
					/>
				</button>
			</th>
			<th className='hover:bg-[#011f46]'></th>
			<th className='hover:bg-[#011f46]'></th>
		</tr>
	);
}
