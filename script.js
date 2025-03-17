async function fetchMarsPhotos(earthDate) {
    const apiKey = 'eq7PZE47vLrrQSwlS9bGdjDbWcTpqRb7A3b7Fzwb'; 
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        if (data.photos.length === 0) {
            throw new Error('No photos found for this date');
        }
        
        return data.photos;
    } catch (error) {
        console.error('Error fetching Mars Rover photos:', error);
        document.getElementById('error-message').style.display = 'block';
        return [];
    }
}

function displayPhotos(photos) {
    const gallery = document.querySelector('#photo-gallery');
    gallery.innerHTML = '';  
    
    if (photos.length === 0) {
        return;
    }

    photos.slice(0, 3).forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.img_src;
        img.alt = `Photo taken by ${photo.rover.name} on ${photo.earth_date}`;
        gallery.appendChild(img);
    });
}

window.onload = () => {
    fetchMarsPhotos('2018-06-01').then(photos => {
        if (photos.length > 0) {
            displayPhotos(photos);
        }
    });
};
 
document.querySelector('#load-photos').addEventListener('click', () => {
    const selectedDate = document.querySelector('#earth-date').value;
    if (selectedDate) {
        document.getElementById('error-message').style.display = 'none'; // Hide error message if valid date
        fetchMarsPhotos(selectedDate).then(photos => {
            displayPhotos(photos);
        });
    } else {
        alert('Please select a date!');
    }
});
