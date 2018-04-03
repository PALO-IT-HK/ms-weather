module.exports = {
  formatWeatherData: (json) => {
    const newObj = ({
      list: json.list,
      city: json.city
    })
  }
}
