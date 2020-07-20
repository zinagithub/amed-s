function deleteService() {
    let btn = document.getElementById('deleteBtn')
    let id = btn.getAttribute('data-id')
    console.log(id)
    axios.delete('/services/delete/'+ id)
    .then( (res)=> {
        console.log(res.data)
        alert('service was deleted')
        window.location.href = '/services'
    })

    .catch( (err)=> {

        console.log(err)
    })

}