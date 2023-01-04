import './Modal.css'

export const Modal = ({ isOpen, closeModal, handleSubmit }) => {
  const handleClickContainer = e => e.stopPropagation()
  return (
    <article className={`modal ${isOpen && 'is-open'}`} onClick={e => handleSubmit(e)}>
      <div className='modal-container' onClick={handleClickContainer}>
        <h1>Pokemon Created</h1>
        <button className='modal-ok' onClick={e => handleSubmit(e)}>GREAT!!!</button>
      </div>
    </article>
  )
}
