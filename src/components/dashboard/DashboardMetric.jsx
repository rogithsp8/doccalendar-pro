export const DashboardMetric = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend, 
  color = 'primary' 
}) => {
  const colorClasses = {
    primary: 'from-primary to-primary-dark',
    secondary: 'from-secondary to-secondary',
    wellness: 'from-wellness to-wellness',
    accent: 'from-accent to-accent'
  };

  return (
    <div className="dashboard-metric-card group">
      <div className="flex items-center justify-between mb-4">
        <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className={`text-sm font-medium ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};