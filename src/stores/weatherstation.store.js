import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherstationStore = defineStore('weatherstation', {
  state: () => ({
    sensors: [],
    locations: [],
    sensor_types: [],
    measurements: []
  }),
  getters: {
    getAllSensors: (state) => {
      return state.sensors
    },
    getSensorById: (state) => (id) => {
      return state.sensors.find((s) => s.id === id)
    },
    getSensorsByLocationId: (state) => (locationId) => {
      return state.sensors.filter((sensor) => {
        return sensor.location && sensor.location.id === locationId
      })
    },
    getAllLocations: (state) => {
      return state.locations
    },
    getLocationById: (state) => (id) => {
      return state.locations.find((l) => l.id === id)
    },
    getAllSensorTypes: (state) => {
      return state.sensor_types
    },
    getSensorTypeById: (state) => (id) => {
      return state.sensor_types.find((st) => st.id === id)
    }
  },

  actions: {
    async addSensor(sensor) {
      try {
        const response = await axios.post('/api/weatherstation/sensors/', sensor)
        const data = response.data

        this.$patch((state) => {
          state.sensors.push(data)
        })
      } catch (error) {
        console.error('Error adding sensor:', error)
      }
    },

    async fetchSensors() {
      try {
        const response = await axios.get(`/api/weatherstation/sensors/`)
        const data = response.data

        this.$patch((state) => {
          state.sensors = data
        })
      } catch (error) {
        console.error('Error fetching sensors:', error)
      }
    },

    async fetchSensorDetail(sensorId) {
      try {
        const response = await axios.get(`/api/weatherstation/sensors/${sensorId}/`)
        const data = response.data

        this.$patch((state) => {
          const index = state.sensors.findIndex((s) => s.id === sensorId)
          state.sensors[index] = data
        })
      } catch (error) {
        console.error('Error fetching sensor:', error)
      }
    },

    async updateSensor(sensor) {
      try {
        // Remove location or sensor type if null
        if (!sensor.location) {
          delete sensor.location
        }
        if (!sensor.sensor_type) {
          delete sensor.sensor_type
        }
        await axios.put(`/api/weatherstation/sensors/${sensor.id}/`, sensor)
        this.$patch((state) => {
          const index = state.sensors.findIndex((s) => s.id === sensor.id)
          state.sensors[index] = sensor
        })
      } catch (error) {
        console.error('Error updating sensor:', error)
      }
    },

    async deleteSensor(sensorId) {
      try {
        await axios.delete(`/api/weatherstation/sensors/${sensorId}/`)
        this.$patch((state) => {
          state.sensors = state.sensors.filter((s) => s.id !== sensorId)
        })
      } catch (error) {
        console.error('Error deleting sensor:', error)
      }
    },

    async fetchLocations(assignedOnly) {
      try {
        const response = await axios.get(
          `/api/weatherstation/locations${assignedOnly ? '/?assigned_only=1' : '/'}`
        )
        const data = response.data

        this.$patch((state) => {
          state.locations = data
        })
      } catch (error) {
        console.error('Error fetching locations:', error)
      }
    },

    async addLocation(location) {
      try {
        const response = await axios.post('/api/weatherstation/locations/', location)
        const data = response.data

        this.$patch((state) => {
          state.locations.push(data)
        })
      } catch (error) {
        console.error('Error adding location:', error)
      }
    },

    async updateLocation(location) {
      try {
        await axios.put(`/api/weatherstation/locations/${location.id}/`, location)
        this.$patch((state) => {
          const index = state.locations.findIndex((l) => l.id === location.id)
          state.locations[index] = location
        })
      } catch (error) {
        console.error('Error updating location:', error)
      }
    },

    async deleteLocation(locationId) {
      try {
        await axios.delete(`/api/weatherstation/locations/${locationId}/`)
        this.$patch((state) => {
          state.locations = state.locations.filter((l) => l.id !== locationId)
        })
      } catch (error) {
        console.error('Error deleting location:', error)
      }
    },

    async fetchSensorTypes(assignedOnly) {
      try {
        const response = await axios.get(
          `/api/weatherstation/sensor_types${assignedOnly ? '/?assigned_only=1' : '/'}`
        )
        const data = response.data

        this.$patch((state) => {
          state.sensor_types = data
        })
      } catch (error) {
        console.error('Error fetching sensor types:', error)
      }
    },

    async addSensorType(sensorType) {
      try {
        const response = await axios.post('/api/weatherstation/sensor_types/', sensorType)
        const data = response.data

        this.$patch((state) => {
          state.sensor_types.push(data)
        })
      } catch (error) {
        console.error('Error adding sensor type:', error)
      }
    },

    async updateSensorType(sensorType) {
      try {
        await axios.put(`/api/weatherstation/sensor_types/${sensorType.id}/`, sensorType)
        this.$patch((state) => {
          const index = state.sensor_types.findIndex((st) => st.id === sensorType.id)
          state.sensor_types[index] = sensorType
        })
      } catch (error) {
        console.error('Error updating sensor type:', error)
      }
    },

    async deleteSensorType(sensorTypeId) {
      try {
        await axios.delete(`/api/weatherstation/sensor_types/${sensorTypeId}/`)
        this.$patch((state) => {
          state.sensor_types = state.sensor_types.filter((st) => st.id !== sensorTypeId)
        })
      } catch (error) {
        console.error('Error deleting sensor type:', error)
      }
    },

    async fetchMeasurements(endDate, latest, sensors, startDate) {
      try {
        const response = await axios.get('/api/weatherstation/measurements/', {
          params: {
            sensors: sensors,
            start_date: startDate,
            end_date: endDate,
            latest: latest
          }
        })
        this.$patch((state) => {
          state.measurements = response.data
        })
        return response.data
      } catch (error) {
        console.error('Error fetching measurements:', error)
      }
    }
  }
})
