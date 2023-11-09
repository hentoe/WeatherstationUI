import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherstationStore = defineStore('weatherstation', {
  state: () => ({
    sensors: [],
    locations: [],
    sensorTypes: [],
    measurements: []
  }),

  actions: {
    async fetchSensors() {
      try {
        const response = await axios.get('/api/weatherstation/sensors/')
        const data = response.data

        this.$patch((state) => {
          state.sensors = data
        })
      } catch (error) {
        console.error('Error fetching sensors:', error)
      }
    },

    async updateSensor(sensor) {
      try {
        // Todo: update location and sensor_type and remove if not needed
        const { id, sensor_type, location, ...rest } = sensor
        console.log('updatedSensor', rest)
        await axios.put(`/api/weatherstation/sensors/${sensor.id}/`, rest)
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
          `/api/weatherstation/locations${assignedOnly ? '/?assigned_only=1' : ''}`
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
        const { id, ...rest } = location
        await axios.put(`/api/weatherstation/locations/${location.id}/`, rest)
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
    }
  }
})
