export const petImage = (image) => {
    if (!image || image === 'no-photo.png')
        return `http://127.0.0.1:8000/images/no-photo.svg`
    return `http://127.0.0.1:8000/images/${image}`
}