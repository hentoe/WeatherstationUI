import { defineStore } from 'pinia'
import api from '@/services/api'

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
        const response = await api.post('/api/weatherstation/sensors/', sensor)
        const data = response.data

        this.$patch((state) => {
          state.sensors.push(data)
        })
      } catch (error) { throw error }
    },

    async fetchSensors() {
      try {
        const response = await api.get('/api/weatherstation/sensors/')
        const data = response.data

        this.$patch((state) => {
          state.sensors = data
        })
      } catch (error) { throw error }
    },

    async fetchSensorDetail(sensorId) {
      try {
        const response = await api.get(`/api/weatherstation/sensors/${sensorId}/`)
        const data = response.data

        this.$patch((state) => {
          const index = state.sensors.findIndex((s) => s.id === sensorId)
          if (index >= 0) state.sensors[index] = data
          else state.sensors.push(data)
        })
      } catch (error) { throw error }
    },

    async updateSensor(sensor) {
      try {
        const payload = { ...sensor }

        if (!payload.location) {
          delete payload.location
        }
        if (!payload.sensor_type) {
          delete payload.sensor_type
        }
        const response = await api.put(`/api/weatherstation/sensors/${sensor.id}/`, payload)
        this.$patch((state) => {
          const index = state.sensors.findIndex((s) => s.id === sensor.id)
          if (index >= 0) state.sensors[index] = response.data
          else state.sensors.push(response.data)
        })
      } catch (error) { throw error }
    },

    async deleteSensor(sensorId) {
      try {
        await api.delete(`/api/weatherstation/sensors/${sensorId}/`)
        this.$patch((state) => {
          state.sensors = state.sensors.filter((s) => s.id !== sensorId)
        })
      } catch (error) { throw error }
    },

    async fetchLocations(assignedOnly) {
      try {
        const response = await api.get(
          `/api/weatherstation/locations${assignedOnly ? '/?assigned_only=1' : '/'}`
        )
        const data = response.data

        this.$patch((state) => {
          state.locations = data
        })
      } catch (error) { throw error }
    },

    async addLocation(location) {
      try {
        const response = await api.post('/api/weatherstation/locations/', location)
        const data = response.data

        this.$patch((state) => {
          state.locations.push(data)
        })
      } catch (error) { throw error }
    },

    async updateLocation(location) {
      try {
        const response = await api.put(`/api/weatherstation/locations/${location.id}/`, location)
        this.$patch((state) => {
          const index = state.locations.findIndex((l) => l.id === location.id)
          if (index >= 0) state.locations[index] = response.data
          else state.locations.push(response.data)
        })
      } catch (error) { throw error }
    },

    async deleteLocation(locationId) {
      try {
        await api.delete(`/api/weatherstation/locations/${locationId}/`)
        this.$patch((state) => {
          state.locations = state.locations.filter((l) => l.id !== locationId)
        })
      } catch (error) { throw error }
    },

    async fetchSensorTypes(assignedOnly) {
      try {
        const response = await api.get(
          `/api/weatherstation/sensor_types${assignedOnly ? '/?assigned_only=1' : '/'}`
        )
        const data = response.data

        this.$patch((state) => {
          state.sensor_types = data
        })
      } catch (error) { throw error }
    },

    async addSensorType(sensorType) {
      try {
        const response = await api.post('/api/weatherstation/sensor_types/', sensorType)
        const data = response.data

        this.$patch((state) => {
          state.sensor_types.push(data)
        })
      } catch (error) { throw error }
    },

    async updateSensorType(sensorType) {
      try {
        const response = await api.put(`/api/weatherstation/sensor_types/${sensorType.id}/`, sensorType)
        this.$patch((state) => {
          const index = state.sensor_types.findIndex((st) => st.id === sensorType.id)
          if (index >= 0) state.sensor_types[index] = response.data
          else state.sensor_types.push(response.data)
        })
      } catch (error) { throw error }
    },

    async deleteSensorType(sensorTypeId) {
      try {
        await api.delete(`/api/weatherstation/sensor_types/${sensorTypeId}/`)
        this.$patch((state) => {
          state.sensor_types = state.sensor_types.filter((st) => st.id !== sensorTypeId)
        })
      } catch (error) { throw error }
    },

    async fetchMeasurements(endDate, latest, sensors, startDate) {
      try {
        const response = await api.get('/api/weatherstation/measurements/', {
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
      } catch (error) { throw error }
    }
  }
})
