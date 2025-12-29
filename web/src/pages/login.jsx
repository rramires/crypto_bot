import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { doLogin } from '../services/auth-service'

export function Login() {
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		email: 'def@email.com',
		password: 'abc123',
	})
	const { email, password } = formData

	const [error, setError] = useState('')

	function changeHandler(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	function clickHandler() {
		doLogin(email, password)
			.then((response) => {
				localStorage.setItem('token', response.token)
				localStorage.setItem('id', response.id)
				navigate('/dashboard')
			})
			.catch((err) => {
				console.error(err)
				setError('Invalid user or/and password!')
			})
	}

	return (
		<main>
			<section className='vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center'>
				<div className='container'>
					<div className='col-12 d-flex align-items-center justify-content-center'>
						<div className='bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500'>
							<div className='text-center text-md-center mb-4 mt-md-0'>
								<img
									src='/img/favicon/favicon-150x150.png'
									alt='CryptoBot Logo'
									width='150'
								/>
							</div>
							<form action='#' className='mt-4'>
								<div className='form-group mb-4'>
									<label htmlFor='email'>Email</label>
									<div className='input-group'>
										<span
											className='input-group-text'
											id='basic-addon1'
										>
											<svg
												className='icon icon-xs text-gray-600'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'></path>
												<path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'></path>
											</svg>
										</span>
										<input
											type='email'
											className='form-control'
											placeholder='example@company.com'
											id='email'
											name='email'
											autoFocus
											required
											value={email}
											onChange={changeHandler}
										/>
									</div>
								</div>

								<div className='form-group'>
									<div className='form-group mb-4'>
										<label htmlFor='password'>
											Password
										</label>
										<div className='input-group'>
											<span
												className='input-group-text'
												id='basic-addon2'
											>
												<svg
													className='icon icon-xs text-gray-600'
													fill='currentColor'
													viewBox='0 0 20 20'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														fillRule='evenodd'
														d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
														clipRule='evenodd'
													></path>
												</svg>
											</span>
											<input
												type='password'
												placeholder='Password'
												className='form-control'
												id='password'
												name='password'
												required
												value={password}
												onChange={changeHandler}
											/>
										</div>
									</div>

									{/* <div className='d-flex justify-content-between align-items-top mb-4'>
										<div className='form-check'>
											<input
												className='form-check-input'
												type='checkbox'
												value=''
												id='remember'
											/>
											<label
												className='form-check-label mb-0'
												htmlFor='remember'
											>
												Lembrar
											</label>
										</div>
										<div>
											<a
												href='./forgot-password.html'
												className='small text-right'
											>
												Esqueceu a senha?
											</a>
										</div>
									</div> */}
								</div>
								<div className='d-grid'>
									<button
										type='button'
										className='btn btn-gray-800'
										onClick={clickHandler}
									>
										Sign in
									</button>
								</div>
								{error && (
									<div className='mt-2 text-center alert alert-danger'>
										{error}
									</div>
								)}
							</form>

							{/* <div className='mt-3 mb-4 text-center'>
								<span className='fw-normal'>or login with</span>
							</div>
							<div className='d-flex justify-content-center my-4'>
								<a
									href='#'
									className='btn btn-icon-only btn-pill btn-outline-gray-500'
									aria-label='github button'
									title='github button'
								>
									<svg
										className='icon icon-xxs'
										aria-hidden='true'
										focusable='false'
										data-prefix='fab'
										data-icon='github'
										role='img'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 496 512'
									>
										<path
											fill='currentColor'
											d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'
										></path>
									</svg>
								</a>
							</div> */}
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
