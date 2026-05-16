
const SHIELD_PATH = "M317.306,54.369C257.93,54.369,212.443,37.405,173.977,0C135.516,37.405,90.031,54.369,30.66,54.369c0,97.401-20.155,236.936,143.317,293.597C337.46,291.304,317.306,151.77,317.306,54.369z";

const gradeColors = {
  A: '#22C55E',
  B: '#F5A524',
  C: '#F31260'
}

const GradeMedal = ({ grade, size = 'md', showLabel, showAsterisk = false, variant = 'default' }) => {
  const displayLabel = showLabel !== undefined ? showLabel : (size === 'lg' || size === 'xl')
  const baseGrade = grade?.[0]
  const color = variant === 'white' ? '#FFFFFF' : (gradeColors[baseGrade] || gradeColors.C)

  return (
    <div className={`grade-medal grade-medal--${size} grade-medal--${baseGrade?.toLowerCase()} ${variant === 'white' ? 'grade-medal--white' : ''}`}>
      <svg viewBox="0 0 347.966 347.966" fill="none" xmlns="http://www.w3.org/2000/svg" className="grade-medal-svg">
        <path d={SHIELD_PATH} fill={color} />
      </svg>
      <div className="grade-medal-content">
        {displayLabel && <span className="grade-medal-label">GRADE{showAsterisk ? '*' : ''}</span>}
        <span className="grade-medal-letter">{grade}</span>
      </div>
    </div>
  )
}

export default GradeMedal
