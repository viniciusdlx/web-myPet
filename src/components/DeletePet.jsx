var tokenAPI = localStorage.getItem('tokenAPI')

export const DeletePet = async (petId, toast, cb) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + tokenAPI,
      'Content-type': 'application/json'
    }
  }
  await fetch(`${import.meta.env.VITE_AUTH0_AUDIENCE}pets/${petId}`, options)
    .then(() => {
      toast.fire({
        icon: 'success',
        title: 'Pet excluido com sucesso'
      })
    })
    .catch(err => {
      toast.fire({
        icon: 'error',
        title: 'Falha ao excluir pet'
      })
    })

  return cb()
}
