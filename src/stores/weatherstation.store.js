import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherstationStore = defineStore('weatherstation', {
  state: () => ({
    sensors: [],
    locations: [],
    sensorTypes: [],
    measurements: []
  }),
  getters: {
    getAllSensors: (state) => state.sensors
  },

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
