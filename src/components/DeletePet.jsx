var tokenAPI = localStorage.getItem('tokenAPI')

export const DeletePet = async (petId, toast, cb) => {
  console.log('petId', petId);

  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + tokenAPI,
      'Content-type': 'application/json'
    },
  }
  await fetch(`${import.meta.env.VITE_AUTH0_AUDIENCE}pets/${petId}`, options)
    .then(() => {
      console.log('sucesso')
      toast.fire({
        icon: 'success',
        title: 'Pet excluido com sucesso'
      })
    })
    .catch(err => {
      console.log('err', err)
      toast.fire({
        icon: 'error',
        title: 'Falha ao excluir pet'
      })
    })

  return cb()
}
