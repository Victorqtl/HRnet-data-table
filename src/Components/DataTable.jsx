import Columns from './Columns';
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { SquarePen } from 'lucide-react';

const DataTable = ({ data, deleteEmployee, editEmployee }) => {
	const [searchText, setSearchText] = useState('');
	const [sortConfig, setSortConfig] = useState(null);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [employeeEdit, setEmployeeEdit] = useState(false);
	const [deleteAlert, setDeleteAlert] = useState(false);
	const [employeeData, setEmployeeData] = useState({});
	console.log(employeeData);

	const filteredAndSortedEmployees = React.useMemo(() => {
		const filtered = data.filter(employee =>
			Object.values(employee).join(' ').toLowerCase().includes(searchText.toLowerCase())
		);

		if (!sortConfig) return [...filtered].reverse();

		const sorted = [...filtered].sort((a, b) => {
			if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
			if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
			return 0;
		});

		return sorted;
	}, [data, searchText, sortConfig]);

	const startIndex = (currentPage - 1) * itemsPerPage;

	const paginatedEmployees = React.useMemo(() => {
		const endIndex = startIndex + itemsPerPage;
		return filteredAndSortedEmployees.slice(startIndex, endIndex);
	}, [filteredAndSortedEmployees, itemsPerPage, currentPage]);

	const totalPages = Math.ceil(filteredAndSortedEmployees.length / itemsPerPage);
	const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

	const handleSort = key => {
		setSortConfig(prev => {
			if (prev?.key === key && prev.direction === 'asc') {
				return { key, direction: 'desc' };
			}
			return { key, direction: 'asc' };
		});
	};

	React.useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	return (
		<div className='w-full flex flex-col items-center text-xs xl:w-fit xl:p-12 xl:mx-auto xl:border bg-white border-[#011f46] xl:rounded-md xl:text-sm xl:shadow-md'>
			<div className='w-full'>
				<div className='w-full flex items-center justify-between mb-4 mt-4 p-4 xl:p-0 xl:mb-6 xl:mt-0'>
					<label
						htmlFor='itemsPerPage'
						className='flex items-center gap-1'>
						Show
						<select
							id='itemsPerPage'
							className='border rounded-md cursor-pointer'
							value={itemsPerPage}
							onChange={e => {
								setItemsPerPage(Number(e.target.value));
								setCurrentPage(1);
							}}>
							<option value='10'>10</option>
							<option value='25'>25</option>
							<option value='50'>50</option>
							<option value='100'>100</option>
						</select>
						entries
					</label>
					<input
						type='text'
						placeholder='Search...'
						className='px-3 py-1 w-[150px] border rounded-md outline-[#011f46] xl:w-[200px]'
						value={searchText}
						onChange={e => {
							setSearchText(e.target.value);
							setCurrentPage(1);
						}}
					/>
				</div>
				<div className='w-full mb-4 overflow-x-auto xl:rounded-md xl:border border-[#011f46] xl:mb-6'>
					<table className='w-full'>
						<thead>
							<Columns handleSort={handleSort} />
						</thead>
						<tbody className='xl:[&_tr:last-child]:border-0'>
							{paginatedEmployees.length > 0 ? (
								paginatedEmployees.map(employee => (
									<tr
										key={employee.id}
										className='h-12 border-b hover:bg-[#011f46] hover:text-white'>
										<td className='p-4 flex items-center gap-2'>
											<span>{employee.firstName}</span>
										</td>
										<td className='p-4'>{employee.lastName}</td>
										<td className='p-4'>{employee.startDate}</td>
										<td className='p-4'>{employee.department}</td>
										<td className='p-4'>{employee.birthDate}</td>
										<td className='p-4'>{employee.street}</td>
										<td className='p-4'>{employee.city}</td>
										<td className='p-4'>{employee.state}</td>
										<td className='p-4'>{employee.zipCode}</td>
										<td className='pr-2'>
											<button
												className='cursor-pointer border rounded-md p-1'
												onClick={() => {
													setEmployeeEdit(true);
													setEmployeeData(employee);
												}}>
												<SquarePen size={20} />
											</button>
										</td>
										<td className='pr-4'>
											<button
												onClick={() => {
													setDeleteAlert(true);
													setEmployeeData(employee);
												}}
												className='cursor-pointer border rounded-md p-1'>
												<Trash2 size={20} />
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										className=' py-4 text-center'
										colSpan={9}>
										No results found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				<div className='flex flex-col items-center gap-4 xl:flex-row xl:justify-between xl:gap-0'>
					<div>
						<p>
							Showing {startIndex <= -1 ? 0 : startIndex + 1} to {paginatedEmployees.length} of{' '}
							{filteredAndSortedEmployees.length} entries
						</p>
					</div>
					<div className='flex gap-2'>
						<button
							className='px-3 py-1 border rounded'
							onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}>
							Previous
						</button>
						<div className='flex items-center gap-2'>
							{pageNumbers.map(number => (
								<button
									key={number}
									onClick={() => setCurrentPage(number)}
									className={`px-3 py-1 border rounded ${
										number === currentPage ? 'bg-[#011f46] text-white' : 'bg-white text-black'
									}`}>
									{number}
								</button>
							))}
						</div>
						<button
							className='px-3 py-1 border rounded'
							onClick={() =>
								setCurrentPage(prev =>
									Math.min(prev + 1, Math.ceil(filteredAndSortedEmployees.length / itemsPerPage))
								)
							}
							disabled={currentPage === Math.ceil(filteredAndSortedEmployees.length / itemsPerPage)}>
							Next
						</button>
					</div>
				</div>
			</div>
			{employeeEdit && (
				<div>
					<div className='flex justify-center items-center fixed left-0 top-0 right-0 bottom-0 bg-black/30'>
						<form
							onSubmit={e => {
								e.preventDefault();
								setEmployeeData(employeeData);
								editEmployee(employeeData.id, employeeData);
								setEmployeeEdit(false);
							}}
							className='flex flex-col gap-4 bg-white border rounded-md p-4'>
							<div className='flex gap-4'>
								<div className='flex flex-col gap-1'>
									<label
										htmlFor='firstName'
										className='text-[#011f46] font-medium'>
										First Name :
									</label>

									<input
										type='text'
										id='firstName'
										defaultValue={employeeData.firstName}
										onChange={e => setEmployeeData({ ...employeeData, firstName: e.target.value })}
										className='p-2 border border-gray-400 rounded-md'
									/>
								</div>
								<div className='flex flex-col gap-1'>
									<label
										htmlFor='lastName'
										className='text-[#011f46] font-medium'>
										Last Name :
									</label>
									<input
										type='text'
										id='lastName'
										defaultValue={employeeData.lastName}
										onChange={e => setEmployeeData({ ...employeeData, lastName: e.target.value })}
										className='p-2 border border-gray-400 rounded-md'
									/>
								</div>
							</div>
							<div className='flex flex-col gap-1'>
								<label
									htmlFor='birthDate'
									className='text-[#011f46] font-medium'>
									Birth Date :
								</label>
								<input
									type='text'
									id='birthDate'
									defaultValue={employeeData.birthDate}
									onChange={e => setEmployeeData({ ...employeeData, birthDate: e.target.value })}
									className='p-2 border border-gray-400 rounded-md'
								/>
							</div>
							<div className='flex gap-4'>
								<div className='flex flex-col gap-1'>
									<label
										htmlFor='street'
										className='text-[#011f46] font-medium'>
										Street :
									</label>

									<input
										type='text'
										id='street'
										defaultValue={employeeData.street}
										onChange={e => setEmployeeData({ ...employeeData, street: e.target.value })}
										className='p-2 border border-gray-400 rounded-md'
									/>
								</div>
								<div className='flex flex-col gap-1'>
									<label
										htmlFor='city'
										className='text-[#011f46] font-medium'>
										City :
									</label>
									<input
										type='text'
										id='city'
										defaultValue={employeeData.city}
										onChange={e => setEmployeeData({ ...employeeData, city: e.target.value })}
										className='p-2 border border-gray-400 rounded-md'
									/>
								</div>
							</div>
							<div className='flex gap-4'>
								<div className='flex flex-col gap-1'>
									<label
										htmlFor='state'
										className='text-[#011f46] font-medium'>
										State :
									</label>

									<input
										type='text'
										id='state'
										defaultValue={employeeData.state}
										onChange={e => setEmployeeData({ ...employeeData, state: e.target.value })}
										className='p-2 border border-gray-400 rounded-md'
									/>
								</div>
								<div className='flex flex-col gap-1'>
									<label
										htmlFor='zipCode'
										className='text-[#011f46] font-medium'>
										Zip Code :
									</label>
									<input
										type='text'
										id='zipCode'
										defaultValue={employeeData.zipCode}
										onChange={e => setEmployeeData({ ...employeeData, zipCode: e.target.value })}
										className='p-2 border border-gray-400 rounded-md'
									/>
								</div>
							</div>
							<div className='flex gap-4'>
								<div className='flex flex-col gap-1'>
									<label
										htmlFor='startDate'
										className='text-[#011f46] font-medium'>
										Start Date :
									</label>

									<input
										type='text'
										id='startDate'
										defaultValue={employeeData.startDate}
										onChange={e => setEmployeeData({ ...employeeData, startDate: e.target.value })}
										className='p-2 border border-gray-400 rounded-md'
									/>
								</div>
								<div className='flex flex-col gap-1'>
									<label
										htmlFor='department'
										className='text-[#011f46]'>
										Department :
									</label>
									<input
										type='text'
										id='department'
										defaultValue={employeeData.department}
										onChange={e => setEmployeeData({ ...employeeData, department: e.target.value })}
										className='p-2 border border-gray-400 rounded-md'
									/>
								</div>
							</div>
							<div className='flex justify-center gap-4'>
								<button
									onClick={() => {
										setEmployeeEdit(false);
										setEmployeeData({});
									}}
									className='px-4 py-2 border rounded-md cursor-pointer'>
									No
								</button>
								<button
									type='submit'
									className='self-center bg-[#011f46] text-white rounded-md px-4 py-2'>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{deleteAlert && (
				<div className='flex justify-center items-center fixed left-0 top-0 right-0 bottom-0 bg-black/30'>
					<div className='flex flex-col justify-center gap-4 bg-white border rounded-md p-4'>
						<p>Do you want to remove this employee ?</p>
						<div className='flex justify-center gap-4 '>
							<button
								onClick={() => {
									setDeleteAlert(false);
									setEmployeeData({});
								}}
								className='px-4 py-2 border rounded-md cursor-pointer'>
								No
							</button>
							<button
								onClick={() => {
									deleteEmployee(employeeData.id);
									setDeleteAlert(false);
									setEmployeeData({});
								}}
								className='py-2 px-4 bg-red-500 text-white rounded-md cursor-pointer'>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DataTable;
