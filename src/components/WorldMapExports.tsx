import React, { useMemo, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { geoMercator } from 'd3-geo';
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps';

interface Region {
  name: string;
  countries: string[];
  icon: string;
  percentage: number;
  color: string;
}

interface CountryNode {
  name: string;
  coordinates: [number, number];
  region: string;
  percentage: number;
}

interface ProjectedCountry extends CountryNode {
  x: number;
  y: number;
}

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 520;
const MAP_SCALE = 170;
const MAP_CENTER: [number, number] = [20, 15];

const COUNTRY_DATA: CountryNode[] = [
  { name: 'Pakistan', coordinates: [69.3451, 30.3753], region: 'Origin', percentage: 0 },
  { name: 'USA', coordinates: [-95.7129, 37.0902], region: 'North America', percentage: 5 },
  { name: 'Germany', coordinates: [10.4515, 51.1657], region: 'Europe', percentage: 37.5 },
  { name: 'UK', coordinates: [-0.1276, 51.5072], region: 'Europe', percentage: 37.5 },
  { name: 'Saudi Arabia', coordinates: [45.0792, 23.8859], region: 'Middle East', percentage: 10 },
  { name: 'Malaysia', coordinates: [101.9758, 4.2105], region: 'Asia Pacific', percentage: 10 },
];

const WorldMapExports: React.FC = () => {
  const [hoveredCountry, setHoveredCountry] = useState<ProjectedCountry | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const regions: Region[] = [
    {
      name: 'North America',
      countries: ['USA'],
      icon: '🇺🇸',
      percentage: 5,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Europe',
      countries: ['Germany', 'UK'],
      icon: '🇪🇺',
      percentage: 75,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Middle East',
      countries: ['Saudi Arabia'],
      icon: '🇦🇪',
      percentage: 10,
      color: 'from-accent to-green-600',
    },
    {
      name: 'Asia Pacific',
      countries: ['Malaysia'],
      icon: '🇦🇺',
      percentage: 10,
      color: 'from-orange-500 to-red-600',
    },
  ];

  const projection = useMemo(() =>
    geoMercator()
      .scale(MAP_SCALE)
      .center(MAP_CENTER)
      .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]),
  []);

  const projectedCountries = useMemo(() =>
    COUNTRY_DATA
      .map((country) => {
        const point = projection(country.coordinates);
        if (!point) {
          return null;
        }
        return { ...country, x: point[0], y: point[1] };
      })
        .filter(Boolean) as ProjectedCountry[],
      [projection]);

  const pakistan = projectedCountries.find((c: ProjectedCountry) => c.name === 'Pakistan');
  const exportDestinations: ProjectedCountry[] = projectedCountries.filter((c: ProjectedCountry) => c.name !== 'Pakistan');

  const getCurvedPath = useCallback((from: ProjectedCountry, to: ProjectedCountry) => {
    const midX = (from.x + to.x) / 2;
    const midY = Math.min(from.y, to.y) - 80;
    return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getColorForCountry = (countryName: string): string => {
    if (countryName === 'USA') return '#3b82f6'; // blue
    if (countryName === 'Germany' || countryName === 'UK') return '#a855f7'; // purple
    if (countryName === 'Saudi Arabia') return '#22c55e'; // green/accent
    if (countryName === 'Malaysia') return '#f97316'; // orange
    return '#10b981'; // default accent
  };

  if (!pakistan) {
    return null;
  }

  return (
    <div
      className="relative w-full h-full min-h-[620px] bg-gradient-to-br from-[#0a1b2f] via-[#122741] to-[#0a1b2f] rounded-2xl p-4 md:p-8 border border-slate-700/60 shadow-2xl overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredCountry(null)}
    >
      {/* Ocean texture overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
            backgroundSize: '34px 34px',
          }}
        />
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: MAP_SCALE, center: MAP_CENTER }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        className="relative z-10 w-full h-full"
      >
        <Graticule stroke="rgba(148, 163, 184, 0.15)" strokeWidth={0.5} />
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1e2f47"
                stroke="#0f172a"
                strokeWidth={0.4}
                style={{
                  default: { opacity: 0.8 },
                  hover: { opacity: 1 },
                  pressed: { opacity: 1 },
                }}
              />
            ))
          }
        </Geographies>

        {/* Animated Lines from Pakistan */}
        {exportDestinations.map((country: ProjectedCountry, index: number) => {
          const path = getCurvedPath(pakistan, country);
          const color = getColorForCountry(country.name);
          const isHovered = hoveredCountry?.name === country.name;

          return (
            <motion.path
              key={`route-${country.name}`}
              d={path}
              fill="none"
              stroke={color}
              strokeWidth={isHovered ? 5 : 3}
              strokeLinecap="round"
              opacity={0.9}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{
                duration: 2.2,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
              style={{
                filter: isHovered ? `drop-shadow(0 0 12px ${color})` : `drop-shadow(0 0 6px ${color})`,
              }}
            />
          );
        })}

        {/* Country Markers */}
        {projectedCountries.map((country: ProjectedCountry) => {
          const isPakistan = country.name === 'Pakistan';
          const color = isPakistan ? '#10b981' : getColorForCountry(country.name);
          const isHovered = hoveredCountry?.name === country.name;

          return (
            <g key={country.name}>
              <motion.circle
                cx={country.x}
                cy={country.y}
                r={isPakistan ? 14 : 10}
                fill="none"
                stroke={color}
                strokeWidth={2}
                opacity={isHovered ? 0.8 : 0.4}
                animate={{ scale: isHovered ? 1.3 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.circle
                cx={country.x}
                cy={country.y}
                r={isPakistan ? 10 : 7}
                fill={color}
                stroke="#ffffff"
                strokeWidth={2}
                style={{
                  filter: `drop-shadow(0 0 ${isHovered ? 16 : 10}px ${color})`,
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.2 }}
                onMouseEnter={() => setHoveredCountry(country)}
              />
              {isPakistan && (
                <motion.circle
                  cx={country.x}
                  cy={country.y}
                  r={10}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                  opacity={0.3}
                  animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
              )}
              <text
                x={country.x}
                y={country.y + (isPakistan ? 26 : 22)}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="12"
                fontWeight="600"
                style={{
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.85))',
                  pointerEvents: 'none',
                }}
              >
                {country.name}
              </text>
            </g>
          );
        })}
      </ComposableMap>
      {/* Tooltip */}
      {hoveredCountry && (
        <motion.div
          className="absolute pointer-events-none z-50 bg-slate-900/95 text-white px-5 py-3 rounded-lg shadow-2xl border-2 border-accent"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y + 20,
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-base font-bold mb-1 text-white">{hoveredCountry.name}</div>
          {hoveredCountry.percentage > 0 && (
            <div className="text-sm text-accent font-semibold">
              Export Share: {hoveredCountry.percentage}%
            </div>
          )}
          {hoveredCountry.name === 'Pakistan' && (
            <div className="text-sm text-accent font-semibold">Origin Point</div>
          )}
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-slate-700/60 shadow-xl">
        <div className="text-sm font-bold mb-3 text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          Export Routes
        </div>
        <div className="space-y-2">
          {regions.map((region) => (
            <div key={region.name} className="flex items-center gap-3 text-xs">
              <div
                className="w-4 h-4 rounded-full border-2 border-white/50 shadow-lg"
                style={{
                  backgroundColor: region.name === 'North America' ? '#3b82f6'
                    : region.name === 'Europe' ? '#a855f7'
                    : region.name === 'Middle East' ? '#22c55e'
                    : '#f97316',
                  boxShadow: `0 0 10px ${region.name === 'North America' ? '#3b82f6'
                    : region.name === 'Europe' ? '#a855f7'
                    : region.name === 'Middle East' ? '#22c55e'
                    : '#f97316'}`
                }}
              />
              <span className="text-slate-300 flex-1">{region.name}</span>
              <span className="text-accent font-bold">{region.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Origin Point Label */}
  
    </div>
  );
};

export default WorldMapExports;
