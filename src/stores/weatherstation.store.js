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
    }
  }
})
