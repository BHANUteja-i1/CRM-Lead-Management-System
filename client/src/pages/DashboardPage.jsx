import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { FiTrendingUp, FiUsers, FiCheckCircle, FiArrowRight } from 'react-icons/fi'
import { Layout } from '../layouts/MainLayout'
import { Card, Spinner } from '../components/ui/FormElements'
import { StatsCard, InfoCard } from '../components/common/CardComponents'
import { dashboardAPI } from '../services/api'
import { useDashboardStore } from '../stores'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

/**
 * Dashboard Page
 */
export const DashboardPage = () => {
  const { analytics, setAnalytics, isLoading, setIsLoading } = useDashboardStore()
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true)
        const response = await dashboardAPI.getAnalytics()
        setAnalytics(response.data.data)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <Spinner />
        </div>
      </Layout>
    )
  }

  if (error || !analytics) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600">Error loading dashboard data</p>
        </div>
      </Layout>
    )
  }

  const { summary, leadsByStatus, leadsByPriority, leadsBySource, monthlyLeads } = analytics

  const statusData = Object.entries(leadsByStatus).map(([name, value]) => ({
    name,
    value,
  }))

  const priorityData = Object.entries(leadsByPriority).map(([name, value]) => ({
    name,
    value,
  }))

  const sourceData = Object.entries(leadsBySource).map(([name, value]) => ({
    name,
    value,
  }))

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome back! Here's your CRM summary.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            icon={FiUsers}
            label="Total Leads"
            value={summary.totalLeads}
            color="primary"
          />
          <StatsCard
            icon={FiCheckCircle}
            label="Converted Leads"
            value={summary.convertedLeads}
            color="success"
          />
          <StatsCard
            icon={FiTrendingUp}
            label="Conversion Rate"
            value={summary.conversionRate}
            color="warning"
          />
          <InfoCard
            title="New Leads"
            value={summary.newLeads}
            subtitle="Last 30 days"
          />
          <InfoCard
            title="Contacted"
            value={summary.contactedLeads}
            subtitle="In progress"
          />
          <InfoCard
            title="Qualified"
            value={summary.qualifiedLeads}
            subtitle="Ready to convert"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads by Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Leads by Status
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Leads by Priority */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Leads by Priority
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Monthly Leads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Monthly Lead Trends
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyLeads || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Leads by Source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Leads by Source
            </h3>
            <div className="space-y-4">
              {sourceData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-slate-700 dark:text-slate-300">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(item.value / Math.max(...sourceData.map((d) => d.value))) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-white w-12 text-right">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </Layout>
  )
}
