function Loading() {
  return (
    <div className="d-flex justify-content-center" style={{marginTop:"40px"}}>
      <div
        className="spinner-border text-primary "
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
export default Loading;
