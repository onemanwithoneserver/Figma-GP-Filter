import { useState } from 'react';
import { Bed, Users, UserCheck, UserX, TrendingUp, Activity, AlertCircle, ArrowUpRight, ArrowDownRight, Clock, DollarSign, FileText, XCircle, RefreshCw, Receipt, Calendar, BarChart3, Coins } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap } from 'recharts';
import { IPAdmit } from './ipd/IPAdmit';
import { IPAdvance } from './ipd/IPAdvance';
import { IPServices } from './ipd/IPServices';
import { IPDischarge } from './ipd/IPDischarge';
import { IPFinalBill } from './ipd/IPFinalBill';
import { IPDuePayments } from './ipd/IPDuePayments';
import { IPServiceCancel } from './ipd/IPServiceCancel';
import { Refunds } from './ipd/Refunds';
import { DayCollection } from './ipd/DayCollection';

// Placeholder components for remaining tabs
function IPBillCancel() {
  return <div className="text-center py-12"><p className="text-gray-600">IP Bill Cancel Module</p></div>;
}

function AdmitCancel() {
  return <div className="text-center py-12"><p className="text-gray-600">Admit Cancel Module</p></div>;
}

function ReceiptCancel() {
  return <div className="text-center py-12"><p className="text-gray-600">Receipt Cancel Module</p></div>;
}

export function InPatientDashboard() {
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-03-05');
  const [selectedWard, setSelectedWard] = useState('All Wards');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Calculate data multiplier based on date range
  const getDateRangeMultiplier = () => {
    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days <= 7) return 0.1; // Week
    if (days <= 31) return 0.3; // Month
    if (days <= 90) return 0.6; // Quarter
    if (days <= 180) return 0.8; // Half year
    return 1.0; // Full year or more
  };

  // Get months in date range
  const getMonthsInRange = () => {
    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    const months = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const current = new Date(start);
    while (current <= end) {
      months.push(monthNames[current.getMonth()]);
      current.setMonth(current.getMonth() + 1);
    }
    return months;
  };

  const multiplier = getDateRangeMultiplier();

  // Dashboard Widget Data (adjusted by date range)
  const widgetData = [
    { id: 'ip-admit', label: 'IP Admit', quantity: Math.round(45 * multiplier), amount: 0, color: '#3b82f6' },
    { id: 'ip-advance', label: 'IP Advance', quantity: Math.round(32 * multiplier), amount: Math.round(245000 * multiplier), color: '#f59e0b' },
    { id: 'ip-services', label: 'IP Services', quantity: Math.round(156 * multiplier), amount: Math.round(425000 * multiplier), color: '#ef4444' },
    { id: 'ip-discharge', label: 'IP Discharge', quantity: Math.round(28 * multiplier), amount: 0, color: '#10b981' },
    { id: 'ip-final-bill', label: 'IP Final Bill', quantity: Math.round(28 * multiplier), amount: Math.round(1250000 * multiplier), color: '#8b5cf6' },
    { id: 'ip-bill-cancel', label: 'IP Bill Cancel', quantity: Math.round(3 * multiplier), amount: Math.round(45000 * multiplier), color: '#6366f1' },
    { id: 'due-payments', label: 'Due Payments', quantity: Math.round(12 * multiplier), amount: Math.round(185000 * multiplier), color: '#ec4899' },
    { id: 'refunds', label: 'Refunds', quantity: Math.round(5 * multiplier), amount: Math.round(35000 * multiplier), color: '#14b8a6' },
  ];

  // Bed Occupancy Trend (filtered by months in range)
  const allOccupancyData = [
    { month: 'Jan', occupied: 85, reserved: 8, available: 7 },
    { month: 'Feb', occupied: 78, reserved: 10, available: 12 },
    { month: 'Mar', occupied: 92, reserved: 5, available: 3 },
    { month: 'Apr', occupied: 88, reserved: 7, available: 5 },
    { month: 'May', occupied: 95, reserved: 3, available: 2 },
    { month: 'Jun', occupied: 82, reserved: 9, available: 9 },
    { month: 'Jul', occupied: 90, reserved: 6, available: 4 },
    { month: 'Aug', occupied: 87, reserved: 8, available: 5 },
    { month: 'Sep', occupied: 93, reserved: 4, available: 3 },
    { month: 'Oct', occupied: 89, reserved: 6, available: 5 },
    { month: 'Nov', occupied: 91, reserved: 5, available: 4 },
    { month: 'Dec', occupied: 86, reserved: 7, available: 7 },
  ];

  const monthsInRange = getMonthsInRange();
  const occupancyTrendData = allOccupancyData.filter(data => monthsInRange.includes(data.month));

  // Revenue Trend (filtered by months in range)
  const allRevenueData = [
    { month: 'Jan', revenue: 450000, expenses: 280000 },
    { month: 'Feb', revenue: 480000, expenses: 295000 },
    { month: 'Mar', revenue: 520000, expenses: 310000 },
    { month: 'Apr', revenue: 495000, expenses: 300000 },
    { month: 'May', revenue: 540000, expenses: 320000 },
    { month: 'Jun', revenue: 510000, expenses: 305000 },
    { month: 'Jul', revenue: 530000, expenses: 315000 },
    { month: 'Aug', revenue: 550000, expenses: 325000 },
    { month: 'Sep', revenue: 505000, expenses: 308000 },
    { month: 'Oct', revenue: 565000, expenses: 335000 },
    { month: 'Nov', revenue: 520000, expenses: 312000 },
    { month: 'Dec', revenue: 540000, expenses: 318000 },
  ];
  
  const revenueTrendData = allRevenueData.filter(data => monthsInRange.includes(data.month));

  // Ward Distribution (adjusted by date range)
  const wardData = [
    { name: 'General Ward', value: Math.round(45 * multiplier), color: '#3b82f6' },
    { name: 'ICU', value: Math.round(12 * multiplier), color: '#ef4444' },
    { name: 'Private Rooms', value: Math.round(28 * multiplier), color: '#10b981' },
    { name: 'Maternity', value: Math.round(18 * multiplier), color: '#f59e0b' },
    { name: 'Pediatric', value: Math.round(22 * multiplier), color: '#8b5cf6' },
  ];

  // Patient Demographics by Age Group (adjusted by date range)
  const ageGroupData = [
    { ageGroup: '0-18', male: Math.round(12 * multiplier), female: Math.round(10 * multiplier) },
    { ageGroup: '19-35', male: Math.round(25 * multiplier), female: Math.round(30 * multiplier) },
    { ageGroup: '36-50', male: Math.round(35 * multiplier), female: Math.round(32 * multiplier) },
    { ageGroup: '51-65', male: Math.round(28 * multiplier), female: Math.round(25 * multiplier) },
    { ageGroup: '66+', male: Math.round(20 * multiplier), female: Math.round(18 * multiplier) },
  ];

  // Admission Trends by Day of Week
  const admissionByDayData = [
    { day: 'Monday', admissions: 18 },
    { day: 'Tuesday', admissions: 22 },
    { day: 'Wednesday', admissions: 20 },
    { day: 'Thursday', admissions: 25 },
    { day: 'Friday', admissions: 19 },
    { day: 'Saturday', admissions: 15 },
    { day: 'Sunday', admissions: 12 },
  ];

  // Average Length of Stay by Department
  const avgStayData = [
    { department: 'General', avgStay: 4.5 },
    { department: 'ICU', avgStay: 8.2 },
    { department: 'Maternity', avgStay: 2.8 },
    { department: 'Pediatric', avgStay: 3.5 },
    { department: 'Cardiology', avgStay: 6.3 },
    { department: 'Orthopedics', avgStay: 5.1 },
  ];

  // Department-wise Patient Distribution (with Admissions and Discharges)
  const departmentAdmissionData = [
    { month: 'Jan', general: 35, generalDischarge: 32, icu: 10, icuDischarge: 9, maternity: 15, maternityDischarge: 14, pediatric: 18, pediatricDischarge: 16 },
    { month: 'Feb', general: 32, generalDischarge: 30, icu: 8, icuDischarge: 7, maternity: 12, maternityDischarge: 11, pediatric: 15, pediatricDischarge: 14 },
    { month: 'Mar', general: 40, generalDischarge: 38, icu: 12, icuDischarge: 11, maternity: 18, maternityDischarge: 17, pediatric: 20, pediatricDischarge: 19 },
    { month: 'Apr', general: 38, generalDischarge: 35, icu: 11, icuDischarge: 10, maternity: 16, maternityDischarge: 15, pediatric: 19, pediatricDischarge: 18 },
    { month: 'May', general: 42, generalDischarge: 40, icu: 13, icuDischarge: 12, maternity: 20, maternityDischarge: 19, pediatric: 22, pediatricDischarge: 21 },
    { month: 'Jun', general: 36, generalDischarge: 34, icu: 9, icuDischarge: 8, maternity: 14, maternityDischarge: 13, pediatric: 17, pediatricDischarge: 16 },
  ];

  // Service Revenue Breakdown
  const serviceRevenueData = [
    { name: 'Room Charges', value: 450000, color: '#3b82f6' },
    { name: 'Procedures', value: 320000, color: '#10b981' },
    { name: 'Medications', value: 280000, color: '#f59e0b' },
    { name: 'Diagnostics', value: 180000, color: '#ef4444' },
    { name: 'Consultations', value: 120000, color: '#8b5cf6' },
  ];

  // Discharge vs Admission Trends
  const dischargeAdmissionData = [
    { month: 'Jan', admissions: 78, discharges: 72 },
    { month: 'Feb', admissions: 67, discharges: 70 },
    { month: 'Mar', admissions: 90, discharges: 85 },
    { month: 'Apr', admissions: 84, discharges: 80 },
    { month: 'May', admissions: 97, discharges: 92 },
    { month: 'Jun', admissions: 76, discharges: 78 },
  ];

  // Ward Performance Metrics (Radar Chart)
  const wardPerformanceData = [
    { metric: 'Occupancy', 'General Ward': 85, ICU: 95, 'Private Rooms': 75, Maternity: 80, Pediatric: 88 },
    { metric: 'Patient Satisfaction', 'General Ward': 88, ICU: 92, 'Private Rooms': 95, Maternity: 90, Pediatric: 93 },
    { metric: 'Avg Stay', 'General Ward': 70, ICU: 40, 'Private Rooms': 85, Maternity: 95, Pediatric: 80 },
    { metric: 'Revenue', 'General Ward': 75, ICU: 90, 'Private Rooms': 88, Maternity: 70, Pediatric: 72 },
    { metric: 'Cleanliness', 'General Ward': 90, ICU: 95, 'Private Rooms': 98, Maternity: 92, Pediatric: 94 },
  ];

  // Department-wise Patient Data for Treemap
  const departmentTreemapData = [
    {
      name: 'Departments',
      children: [
        { name: 'Gynaecology', size: 8500, patients: 8500, color: '#86EFAC' },
        { name: 'Neurology', size: 15000, patients: 15000, color: '#10B981' },
        { name: 'Cardiology', size: 7000, patients: 7000, color: '#6EE7B7' },
        { name: 'Surgery', size: 12000, patients: 12000, color: '#059669' },
        { name: 'Conchology', size: 10500, patients: 10500, color: '#064E3B' },
        { name: 'Orthopaedics', size: 4500, patients: 4500, color: '#D1FAE5' },
        { name: 'Dermatology', size: 2500, patients: 2500, color: '#34D399' },
      ],
    },
  ];

  // Calculate data based on date range
  const calculateDepartmentData = (from, to) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const daysDiff = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
    const monthsDiff = daysDiff / 30;
    
    // Base monthly values
    const baseMonthlyData = {
      gynaecology: 710,
      neurology: 1250,
      cardiology: 580,
      surgery: 1000,
      conchology: 875,
      orthopaedics: 375,
      dermatology: 210,
    };

    // Calculate totals based on date range
    const multiplier = Math.max(monthsDiff, 0.1);
    
    return {
      gynaecology: Math.round(baseMonthlyData.gynaecology * multiplier),
      neurology: Math.round(baseMonthlyData.neurology * multiplier),
      cardiology: Math.round(baseMonthlyData.cardiology * multiplier),
      surgery: Math.round(baseMonthlyData.surgery * multiplier),
      conchology: Math.round(baseMonthlyData.conchology * multiplier),
      orthopaedics: Math.round(baseMonthlyData.orthopaedics * multiplier),
      dermatology: Math.round(baseMonthlyData.dermatology * multiplier),
    };
  };

  const deptData = calculateDepartmentData(dateFrom, dateTo);
  const totalPatients = Object.values(deptData).reduce((sum, val) => sum + val, 0);
  const patientsAdmitted = Math.round(totalPatients * 0.504); // 50.4% admission rate
  const operationalCost = Math.round((totalPatients * 4.1) / 1000); // $4.1K per patient
  const avgCostPerPatient = 4.1;
  const totalDoctors = 280;
  const avgPatientsPerDoctor = (totalPatients / totalDoctors / Math.max((new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24 * 30), 1)).toFixed(2);

  const filteredDepartmentTreemapData = [
    {
      name: 'Departments',
      children: [
        { name: 'Gynaecology', size: deptData.gynaecology, patients: deptData.gynaecology, color: '#86EFAC' },
        { name: 'Neurology', size: deptData.neurology, patients: deptData.neurology, color: '#10B981' },
        { name: 'Cardiology', size: deptData.cardiology, patients: deptData.cardiology, color: '#6EE7B7' },
        { name: 'Surgery', size: deptData.surgery, patients: deptData.surgery, color: '#059669' },
        { name: 'Conchology', size: deptData.conchology, patients: deptData.conchology, color: '#064E3B' },
        { name: 'Orthopaedics', size: deptData.orthopaedics, patients: deptData.orthopaedics, color: '#D1FAE5' },
        { name: 'Dermatology', size: deptData.dermatology, patients: deptData.dermatology, color: '#34D399' },
      ].filter(dept => dept.size > 0), // Filter out departments with no patients
    },
  ];

  // Patients by Age - Admission data based on date range
  const calculatePatientsByAge = (from, to) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const daysDiff = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
    const monthsDiff = Math.ceil(daysDiff / 30);

    // Generate monthly data for the date range
    const monthlyData = [];
    const currentDate = new Date(fromDate);
    
    for (let i = 0; i < Math.min(monthsDiff, 12); i++) {
      const monthName = currentDate.toLocaleString('en-US', { month: 'short' });
      monthlyData.push({
        month: monthName,
        '0-5': Math.floor(Math.random() * 15) + 8,
        '6-15': Math.floor(Math.random() * 20) + 12,
        '16-25': Math.floor(Math.random() * 25) + 15,
        '26-45': Math.floor(Math.random() * 30) + 20,
        '46+': Math.floor(Math.random() * 35) + 25,
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return monthlyData.length > 0 ? monthlyData : [
      { month: 'Current', '0-5': 10, '6-15': 15, '16-25': 20, '26-45': 25, '46+': 30 }
    ];
  };

  const patientsByAgeData = calculatePatientsByAge(dateFrom, dateTo);

  // Department Wise Income - Based on date range
  const calculateDepartmentIncome = (from, to) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const daysDiff = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
    const monthsDiff = Math.ceil(daysDiff / 30);

    // Generate monthly income data
    const monthlyData = [];
    const currentDate = new Date(fromDate);
    
    // Base monthly income for each department (in thousands)
    const baseIncome = {
      neurology: 45,
      dentalCare: 32,
      gynaecology: 38,
      orthopedic: 28,
    };

    for (let i = 0; i < Math.min(monthsDiff, 12); i++) {
      const monthName = currentDate.toLocaleString('en-US', { month: 'short' });
      const growthFactor = 1 + (i * 0.05); // 5% growth per month
      
      const neurology = Math.round(baseIncome.neurology * growthFactor + Math.random() * 10);
      const dentalCare = Math.round(baseIncome.dentalCare * growthFactor + Math.random() * 8);
      const gynaecology = Math.round(baseIncome.gynaecology * growthFactor + Math.random() * 9);
      const orthopedic = Math.round(baseIncome.orthopedic * growthFactor + Math.random() * 7);
      
      monthlyData.push({
        month: monthName,
        Neurology: neurology,
        'Dental Care': dentalCare,
        Gynaecology: gynaecology,
        Orthopedic: orthopedic,
        total: neurology + dentalCare + gynaecology + orthopedic,
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return monthlyData.length > 0 ? monthlyData : [
      { 
        month: 'Current', 
        Neurology: 45, 
        'Dental Care': 32, 
        Gynaecology: 38, 
        Orthopedic: 28,
        total: 143
      }
    ];
  };

  const departmentIncomeData = calculateDepartmentIncome(dateFrom, dateTo);

  // Quick date range setter
  const [showDateRangeMenu, setShowDateRangeMenu] = useState(false);

  const setQuickDateRange = (range) => {
    const today = new Date();
    let from = new Date();
    
    switch (range) {
      case 'today':
        from = new Date(today);
        break;
      case 'yesterday':
        from = new Date(today);
        from.setDate(from.getDate() - 1);
        setDateTo(from.toISOString().split('T')[0]);
        break;
      case '7days':
        from.setDate(today.getDate() - 7);
        break;
      case '30days':
        from.setDate(today.getDate() - 30);
        break;
      case 'month':
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
    }
    
    setDateFrom(from.toISOString().split('T')[0]);
    if (range !== 'yesterday') {
      setDateTo(today.toISOString().split('T')[0]);
    }
    setShowDateRangeMenu(false);
  };

  // Current Patients
  const patients = [
    { id: 1, name: 'Alice Cooper', age: 45, ward: 'General Ward', bed: 'A-101', admitted: '2024-02-15', condition: 'Stable', doctor: 'Dr. Smith' },
    { id: 2, name: 'Bob Martinez', age: 62, ward: 'ICU', bed: 'ICU-05', admitted: '2024-02-20', condition: 'Critical', doctor: 'Dr. Johnson' },
    { id: 3, name: 'Catherine Lee', age: 28, ward: 'Maternity', bed: 'M-203', admitted: '2024-02-18', condition: 'Stable', doctor: 'Dr. Williams' },
    { id: 4, name: 'Daniel Kim', age: 7, ward: 'Pediatric', bed: 'P-112', admitted: '2024-02-21', condition: 'Improving', doctor: 'Dr. Brown' },
    { id: 5, name: 'Emma Wilson', age: 53, ward: 'Private Rooms', bed: 'PR-301', admitted: '2024-02-19', condition: 'Stable', doctor: 'Dr. Davis' },
    { id: 6, name: 'Frank Garcia', age: 71, ward: 'General Ward', bed: 'A-205', admitted: '2024-02-17', condition: 'Improving', doctor: 'Dr. Smith' },
  ];

  const getConditionBadge = (condition) => {
    const colors = {
      'Stable': 'bg-green-100 text-green-700 border-green-300',
      'Critical': 'bg-red-100 text-red-700 border-red-300',
      'Improving': 'bg-blue-100 text-blue-700 border-blue-300',
      'Monitoring': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    };
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${colors[condition]}`}>
        {condition}
      </span>
    );
  };

  const calculateDaysAdmitted = (admittedDate) => {
    const admitted = new Date(admittedDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - admitted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'ip-admit', label: 'IP Admit', icon: Bed },
    { id: 'ip-advance', label: 'IP Advance', icon: DollarSign },
    { id: 'ip-services', label: 'IP Services', icon: FileText },
    { id: 'ip-discharge', label: 'IP Discharge', icon: UserX },
    { id: 'ip-final-bill', label: 'IP Final Bill', icon: Receipt },
    { id: 'ip-bill-cancel', label: 'IP Bill Cancel', icon: XCircle },
    { id: 'due-payments', label: 'Due Payments', icon: AlertCircle },
    { id: 'refunds', label: 'Refunds', icon: RefreshCw },
    { id: 'admit-cancel', label: 'Admit Cancel', icon: XCircle },
    { id: 'service-cancel', label: 'IP Service Cancel', icon: XCircle },
    { id: 'receipt-cancel', label: 'Receipt Cancel', icon: XCircle },
    { id: 'day-collection', label: 'Day Collection', icon: Coins },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">In Patient Department (IPD)</h2>
              <p className="text-sm text-gray-500 mt-1">Comprehensive IPD Management System</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Bed className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 bg-purple-50'
                      : 'border-transparent text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">A</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome back, admin!</h2>
                  <p className="text-sm text-gray-500">In Patient Department Dashboard</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select 
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>All Wards</option>
                  <option>General Ward</option>
                  <option>ICU</option>
                  <option>Private Rooms</option>
                  <option>Maternity</option>
                  <option>Pediatric</option>
                </select>
              </div>
            </div>

            {/* Date Filters */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-sm border-2 border-purple-200">
              <div className="flex flex-col gap-4">
                {/* Quick Date Presets */}
                <div className="flex items-center gap-2 pb-3 border-b border-purple-200">
                  <span className="text-sm font-semibold text-gray-700 mr-2">Quick Select:</span>
                  <button
                    onClick={() => {
                      const today = new Date();
                      const weekAgo = new Date(today);
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      setDateFrom(weekAgo.toISOString().split('T')[0]);
                      setDateTo(today.toISOString().split('T')[0]);
                    }}
                    className="px-3 py-1.5 bg-white border border-purple-300 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50 transition-colors"
                  >
                    Last 7 Days
                  </button>
                  <button
                    onClick={() => {
                      const today = new Date();
                      const monthAgo = new Date(today);
                      monthAgo.setMonth(monthAgo.getMonth() - 1);
                      setDateFrom(monthAgo.toISOString().split('T')[0]);
                      setDateTo(today.toISOString().split('T')[0]);
                    }}
                    className="px-3 py-1.5 bg-white border border-purple-300 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50 transition-colors"
                  >
                    Last Month
                  </button>
                  <button
                    onClick={() => {
                      const today = new Date();
                      const quarterAgo = new Date(today);
                      quarterAgo.setMonth(quarterAgo.getMonth() - 3);
                      setDateFrom(quarterAgo.toISOString().split('T')[0]);
                      setDateTo(today.toISOString().split('T')[0]);
                    }}
                    className="px-3 py-1.5 bg-white border border-purple-300 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50 transition-colors"
                  >
                    Last Quarter
                  </button>
                  <button
                    onClick={() => {
                      setDateFrom('2026-01-01');
                      setDateTo('2026-12-31');
                    }}
                    className="px-3 py-1.5 bg-white border border-purple-300 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50 transition-colors"
                  >
                    Full Year 2026
                  </button>
                </div>

                {/* Custom Date Range */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-semibold text-gray-700">From Date:</label>
                      <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="px-4 py-2.5 border-2 border-purple-300 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-semibold text-gray-700">To Date:</label>
                      <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="px-4 py-2.5 border-2 border-purple-300 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-purple-100 rounded-lg border border-purple-300">
                    <span className="text-sm font-semibold text-purple-700">
                      📊 {Math.ceil((new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24))} days of data
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget Cards - Dashboard Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {widgetData.map((widget) => (
                <div key={widget.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-700">{widget.label}</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-6xl font-bold mb-2" style={{ color: widget.color }}>
                      {widget.quantity}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">Quantity</p>
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700">
                        Amount: <span className="text-gray-900">₹{widget.amount.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Cards 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Beds 
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Bed className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-1 text-purple-600">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Beds</h3>
                <p className="text-4xl font-bold text-purple-600 mb-1">250</p>
                <p className="text-xs text-gray-500">Across all wards</p>
              </div>

              {/* Occupied Beds 
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex items-center gap-1 text-red-600">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-xs font-semibold">+5%</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Occupied Beds</h3>
                <p className="text-4xl font-bold text-red-600 mb-1">218</p>
                <p className="text-xs text-gray-500">87% Occupancy</p>
              </div>

              {/* Available Beds
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <UserX className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowDownRight className="w-4 h-4" />
                    <span className="text-xs font-semibold">-5%</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Available Beds</h3>
                <p className="text-4xl font-bold text-green-600 mb-1">32</p>
                <p className="text-xs text-gray-500">13% Available</p>
              </div>

              {/* Critical Patients 
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowDownRight className="w-4 h-4" />
                    <span className="text-xs font-semibold">-2</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Critical Patients</h3>
                <p className="text-4xl font-bold text-orange-600 mb-1">12</p>
                <p className="text-xs text-gray-500">Requires attention</p>
              </div>
            </div>*/}

            {/* Ward Occupancy Row - Combined Total Ward Occupancy and Bed Occupancy Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Total Ward Occupancy */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  Total Ward Occupancy
                </h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <PieChart width={220} height={220}>
                      <Pie
                        data={[
                          { name: 'In use', value: 78, color: '#ef4444' },
                          { name: 'Reserved', value: 8, color: '#f59e0b' },
                          { name: 'Empty', value: 11, color: '#3b82f6' },
                          { name: 'Repair', value: 3, color: '#6b7280' },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        <Cell fill="#ef4444" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#3b82f6" />
                        <Cell fill="#6b7280" />
                      </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900">78%</div>
                        <div className="text-sm text-gray-500 mt-1">In Use</div>
                      </div>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="ml-8 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                      <span className="text-sm font-medium text-gray-700">In use: <span className="font-bold text-red-600">78%</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                      <span className="text-sm font-medium text-gray-700">Reserved: <span className="font-bold text-orange-600">8%</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                      <span className="text-sm font-medium text-gray-700">Empty: <span className="font-bold text-blue-600">11%</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
                      <span className="text-sm font-medium text-gray-700">Repair: <span className="font-bold text-gray-600">3%</span></span>
                    </div>
                  </div>
                </div>

                {/* Inpatients and Discharged Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Number of inpatients */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                    <div className="text-xs font-medium text-purple-600 mb-1">Inpatients total</div>
                    <div className="text-3xl font-bold text-purple-900">405</div>
                    <div className="text-xs text-purple-600 mt-1">Active now</div>
                  </div>

                  {/* Number of discharged */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <div className="text-xs font-medium text-green-600 mb-1">Discharged patients</div>
                    <div className="text-3xl font-bold text-green-900">24</div>
                    <div className="text-xs text-green-600 mt-1">Last 24 hours</div>
                  </div>
                </div>
              </div>

              {/* Bed Occupancy Trends */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Bed Occupancy Trends
                  </h3>
                  <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>This Year</option>
                    <option>Last Year</option>
                    <option>Last 6 Months</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={occupancyTrendData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#6b7280', fontSize: 11 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fill: '#6b7280', fontSize: 11 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '10px' }}
                      iconType="square"
                      iconSize={12}
                    />
                    <Bar dataKey="occupied" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} name="Occupied" />
                    <Bar dataKey="reserved" fill="#fbbf24" radius={[4, 4, 0, 0]} maxBarSize={40} name="Reserved" />
                    <Bar dataKey="available" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} name="Available" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Currently used beds */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                <div className="text-xs font-medium text-red-600 mb-1">Currently used beds</div>
                <div className="text-3xl font-bold text-red-900">405</div>
                <div className="text-xs text-red-600 mt-1">78% capacity</div>
              </div>

              {/* Reserved beds */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                <div className="text-xs font-medium text-orange-600 mb-1">Reserved beds</div>
                <div className="text-3xl font-bold text-orange-900">42</div>
                <div className="text-xs text-orange-600 mt-1">8% reserved</div>
              </div>

              {/* Available beds */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="text-xs font-medium text-blue-600 mb-1">Available beds</div>
                <div className="text-3xl font-bold text-blue-900">57</div>
                <div className="text-xs text-blue-600 mt-1">11% available</div>
              </div>

              {/* Repair/Maintenance */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <div className="text-xs font-medium text-gray-600 mb-1">Repair/Maintenance</div>
                <div className="text-3xl font-bold text-gray-900">16</div>
                <div className="text-xs text-gray-600 mt-1">3% in repair</div>
              </div>
            </div>

            {/* Additional Charts Row */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Ward Distribution 
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  Ward Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={wardData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {wardData.map((entry, index) => (
                        <Cell key={`cell-ward-${entry.name}-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {wardData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}

            {/* Service Revenue Breakdown Row */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Service Revenue Breakdown 
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  Service Revenue Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={serviceRevenueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      label={(entry) => `₹${(entry.value / 1000).toFixed(0)}K`}
                    >
                      {serviceRevenueData.map((entry, index) => (
                        <Cell key={`cell-service-${entry.name}-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {serviceRevenueData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}

          
            

            {/* Advanced Charts Row 3 */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department-wise Patient Distribution with Admissions & Discharges 
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-600" />
                    Monthly Admissions & Discharges by Department
                  </h3>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-blue-600"></div>
                      <span className="text-gray-600 font-medium">Admissions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-green-400 to-green-500"></div>
                      <span className="text-gray-600 font-medium">Discharges</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={departmentAdmissionData} barGap={2} barCategoryGap="15%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="rect"
                      formatter={(value) => {
                        const labels: { [key: string]: string } = {
                          'general': 'General Ward',
                          'generalDischarge': 'General Ward',
                          'icu': 'ICU',
                          'icuDischarge': 'ICU',
                          'maternity': 'Maternity',
                          'maternityDischarge': 'Maternity',
                          'pediatric': 'Pediatric',
                          'pediatricDischarge': 'Pediatric'
                        };
                        return labels[value] || value;
                      }}
                    />
                    {/* General Ward 
                    <Bar dataKey="general" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={35} />
                    <Bar dataKey="generalDischarge" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={35} />
                    {/* ICU 
                    <Bar dataKey="icu" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={35} />
                    <Bar dataKey="icuDischarge" fill="#86efac" radius={[4, 4, 0, 0]} maxBarSize={35} />
                    {/* Maternity 
                    <Bar dataKey="maternity" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={35} />
                    <Bar dataKey="maternityDischarge" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={35} />
                    {/* Pediatric 
                    <Bar dataKey="pediatric" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={35} />
                    <Bar dataKey="pediatricDischarge" fill="#6ee7b7" radius={[4, 4, 0, 0]} maxBarSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Discharge vs Admission Trends 
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Admission vs Discharge Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={dischargeAdmissionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="admissions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Line type="monotone" dataKey="discharges" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div> */}

            {/* Department & Doctor-wise Patients Widget */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  Department & Doctor-wise Patients Admission and Discharge
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-blue-600"></div>
                    <span className="text-gray-600 font-medium">Admissions</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-400 to-emerald-500"></div>
                    <span className="text-gray-600 font-medium">Discharges</span>
                  </div>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={450}>
                <BarChart 
                  data={[
                    { dept: 'Cardiology', admissions: 580, discharges: 548, doctors: 45 },
                    { dept: 'Neurology', admissions: 1250, discharges: 1188, doctors: 52 },
                    { dept: 'Orthopedics', admissions: 875, discharges: 831, doctors: 38 },
                    { dept: 'Gynaecology', admissions: 710, discharges: 674, doctors: 35 },
                    { dept: 'Surgery', admissions: 1000, discharges: 950, doctors: 48 },
                    { dept: 'Pediatrics', admissions: 650, discharges: 617, doctors: 42 },
                    { dept: 'Dermatology', admissions: 210, discharges: 199, doctors: 20 },
                  ]}
                  layout="vertical"
                  barGap={4}
                  margin={{ left: 20, right: 30, top: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                  <YAxis 
                    type="category" 
                    dataKey="dept" 
                    tick={{ fill: '#374151', fontSize: 13, fontWeight: 600 }} 
                    axisLine={{ stroke: '#e5e7eb' }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                    formatter={(value, name, props) => {
                      const { doctors } = props.payload;
                      const avgPerDoctor = name === 'admissions'
                        ? (value / doctors).toFixed(1)
                        : (value / doctors).toFixed(1);
                      return [value, `${name === 'admissions' ? 'Admissions' : 'Discharges'} (${avgPerDoctor}/doctor)`];
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                  />
                  <Bar dataKey="admissions" fill="#3b82f6" radius={[0, 4, 4, 0]} maxBarSize={28} name="Admissions" />
                  <Bar dataKey="discharges" fill="#10b981" radius={[0, 4, 4, 0]} maxBarSize={28} name="Discharges" />
                </BarChart>
              </ResponsiveContainer>

              {/* Summary Stats Row */}
              <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Admissions</p>
                  <p className="text-2xl font-bold text-blue-600">5,275</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Discharges</p>
                  <p className="text-2xl font-bold text-green-600">5,007</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Active Doctors</p>
                  <p className="text-2xl font-bold text-purple-600">280</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Avg Per Doctor</p>
                  <p className="text-2xl font-bold text-gray-900">18.8</p>
                </div>
              </div>
            </div>

            {/* Patients by Age - Admission Based */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-600" />
                  Patients by Age
                </h3>
                <div className="relative">
                  <button
                    onClick={() => setShowDateRangeMenu(!showDateRangeMenu)}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-teal-500 transition-all"
                  >
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">
                      {new Date(dateFrom).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} - {new Date(dateTo).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                    </span>
                  </button>
                  {showDateRangeMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10 min-w-[160px]">
                      <button
                        onClick={() => setQuickDateRange('today')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Today
                      </button>
                      <button
                        onClick={() => setQuickDateRange('yesterday')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Yesterday
                      </button>
                      <button
                        onClick={() => setQuickDateRange('7days')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Last 7 Days
                      </button>
                      <button
                        onClick={() => setQuickDateRange('30days')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 bg-teal-50 font-semibold transition-colors border-l-4 border-teal-500"
                      >
                        Last 30 Days
                      </button>
                      <button
                        onClick={() => setQuickDateRange('month')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Last Month
                      </button>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={() => setShowDateRangeMenu(false)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Custom Range
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={patientsByAgeData}>
                  <defs>
                    <linearGradient id="color0-5" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="color6-15" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="color16-25" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5eead4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#5eead4" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="color26-45" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="color46plus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />
                  <Area type="monotone" dataKey="0-5" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#color0-5)" name="0-5 Years" />
                  <Area type="monotone" dataKey="6-15" stroke="#2dd4bf" strokeWidth={2} fillOpacity={1} fill="url(#color6-15)" name="6-15 Years" />
                  <Area type="monotone" dataKey="16-25" stroke="#5eead4" strokeWidth={2} fillOpacity={1} fill="url(#color16-25)" name="16-25 Years" />
                  <Area type="monotone" dataKey="26-45" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#color26-45)" name="26-45 Years" />
                  <Area type="monotone" dataKey="46+" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#color46plus)" name="46+ Years" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Income By Department */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  Income By Department
                </h3>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border-2 border-green-200">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">₹2,450K Total</span>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={380}>
                <ComposedChart data={departmentIncomeData}>
                  <defs>
                    <linearGradient id="colorNeurology" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.7}/>
                    </linearGradient>
                    <linearGradient id="colorDental" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.7}/>
                    </linearGradient>
                    <linearGradient id="colorGyn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.7}/>
                    </linearGradient>
                    <linearGradient id="colorOrtho" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value) => `₹${value}K`}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                  />
                  <Bar dataKey="Neurology" fill="url(#colorNeurology)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Dental Care" fill="url(#colorDental)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Gynaecology" fill="url(#colorGyn)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Orthopedic" fill="url(#colorOrtho)" radius={[8, 8, 0, 0]} />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#059669" 
                    strokeWidth={4} 
                    dot={{ fill: '#059669', r: 6, strokeWidth: 2, stroke: '#fff' }}
                    name="Total Income"
                    activeDot={{ r: 8 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>

              {/* Department Performance Summary */}
              <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 mb-1">Neurology</p>
                  <p className="text-lg font-bold text-blue-700">₹680K</p>
                  <p className="text-xs text-blue-500">27.8%</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-600 mb-1">Dental Care</p>
                  <p className="text-lg font-bold text-green-700">₹590K</p>
                  <p className="text-xs text-green-500">24.1%</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-xs text-orange-600 mb-1">Gynaecology</p>
                  <p className="text-lg font-bold text-orange-700">₹630K</p>
                  <p className="text-xs text-orange-500">25.7%</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xs text-purple-600 mb-1">Orthopedic</p>
                  <p className="text-lg font-bold text-purple-700">₹550K</p>
                  <p className="text-xs text-purple-500">22.4%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ip-admit' && <IPAdmit />}
        {activeTab === 'ip-advance' && <IPAdvance />}
        {activeTab === 'ip-services' && <IPServices />}
        {activeTab === 'ip-discharge' && <IPDischarge />}
        {activeTab === 'ip-final-bill' && <IPFinalBill />}
        {activeTab === 'ip-bill-cancel' && <IPBillCancel />}
        {activeTab === 'due-payments' && <IPDuePayments />}
        {activeTab === 'refunds' && <Refunds />}
        {activeTab === 'admit-cancel' && <AdmitCancel />}
        {activeTab === 'service-cancel' && <IPServiceCancel />}
        {activeTab === 'receipt-cancel' && <ReceiptCancel />}
        {activeTab === 'day-collection' && <DayCollection />}
      </div>
    </div>
  );
}
