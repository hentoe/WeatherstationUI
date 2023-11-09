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
  mutations: {
    addSensor: (state, newSensor) => {
      state.sensors.push(newSensor)
    },
    removeSensor: (state, sensorId) => {
      state.sensors = state.sensors.filter((s) => s.id !== sensorId)
    }
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
        this.removeSensor(sensorId)
      } catch (error) {
        console.error('Error deleting sensor:', error)
      }
    }
  }
})
