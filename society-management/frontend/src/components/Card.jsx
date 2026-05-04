function Card({ title, value, color }) {
  return (
    <div className="card" style={{ borderTop: `4px solid ${color}` }}>
      <h4>{title}</h4>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}

export default Card;