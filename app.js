const cityName = document.querySelector('.city-name');
const searchCity = document.querySelector('.search-city');
const speedWind = document.querySelector('.speed-wind');
const btnSearch = document.querySelector('.btn-seacrh');
const rotobat = document.querySelector('.rotobat');
const degre = document.querySelector('.degre');
const weatherImg = document.querySelector('.weather-img');

const apiKey = '28a9573907cb25eb0d6150272db8eae8';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';


async function checkWeather(city) {
    try {

        const styleBox = document.querySelector('.img-weather')
        styleBox.style.display = 'none'

        const loader = document.querySelector('.loader');
        loader.style.display = 'block';

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

        loader.style.display = 'none';
        styleBox.style.display = 'block'

        let data = await response.json();


        if (data.message === 'city not found') {

            const error = document.getElementsByClassName('error-message')
            error[0].innerHTML = 'شهر مورد نظر پیدا نشد .';

            const styleBox = document.querySelector('.img-weather')
            styleBox.style.display = 'none'

        }
        else {

            const styleBox = document.querySelector('.img-weather')
            styleBox.style.display = 'block'

            const error = document.getElementsByClassName('error-message')
            error[0].innerHTML = '';

            cityName.innerHTML = data.name;
            degre.innerHTML = Math.round(data.main.temp) + ' ' + '°C';
            speedWind.innerHTML = Math.round(data.wind.speed) + ' ' + 'km/h';
            rotobat.innerHTML = data.main.humidity + ' ' + '%';


            if (data.weather[0].icon === '02n') {
                weatherImg.src = './Img/شب ابری.png'
            }
            else if (data.weather[0].icon === '02d') {
                weatherImg.src = './Img/روز ابری.png'
            }

            else if (data.weather[0].icon === '01d') {
                weatherImg.src = './Img/روز آفتابی.png'
            }
            else if (data.weather[0].icon === '01n') {
                weatherImg.src = './Img/شب بدون ابر.png'
            }

            else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
                weatherImg.src = './Img/ابری.png'
            }

            else if (data.weather[0].icon === '04d') {
                weatherImg.src = './Img/ابر های شکسته روز.png'
            }
            else if (data.weather[0].icon === '04n') {
                weatherImg.src = './Img/ابر های شکسته شب.png'
            }

            else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
                weatherImg.src = './Img/بارش نم نم.png'
            }

            else if (data.weather[0].icon === '10d') {
                weatherImg.src = './Img/باران شدید روز.png'
            } else if (data.weather[0].icon === '10n') {
                weatherImg.src = './Img/باران شدید شب.png'
            }

            else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
                weatherImg.src = './Img/برف.png'
            }
        }
    } catch {
        const loader = document.querySelector('.loader');
        loader.style.display = 'none';
        Swal.fire({
            title: 'اینترنت پایدار نیست',
            text: 'لطفا در صورت سرچ نشدن از فیلتر شکن استفاده کنید !',
            icon: 'error',
            confirmButtonText: 'تایید',
            timer: '6000',
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseleave = Swal.resumeTimer;
            }
        })
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.querySelector('.btn-search').click();
    }
})

function btnClickSeacrh() {
    checkWeather(searchCity.value)
}
