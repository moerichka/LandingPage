import { useState } from "react";

const styles = {
  popup: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: 'hsla(0, 0%, 0%, 0.5)',
    top: '0',
    left: '0',
    zIndex: '20',
    overflowY: 'auto',
    overflowX: 'hidden',

    opacity: '0',
    visibility: 'hidden',
  },
  form: {
    position: "fixed",
    width: "540px",
    height: "800px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '50',

    background: "#FFFFFF",
    boxShadow: "5px 10px 50px rgba(16, 112, 177, 0.2)",
    borderRadius: "10px",
  },
  popup__close: {
    display: 'block',
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '12px',
    height: '12px',
    padding: '8px',
    borderRadius: '50%',
    cursor: 'pointer',
    background: '#FFFFFF',
    textAlign: 'center',
    fontSize: '12px',
    lineHeight: '12px',
    color: '#5a98d0',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor:'pointer',
    boxSizing: 'contentBox !important',
    border: '1px solid #5a98d0',
},
};

const Form = () => {
  return <div className="popup" id="popup" style={styles.popup}>
  <div id="popup_close" className="popup__close" style={styles.popup__close}>X</div>
    <form id="form-contact" style={styles.form} className="form-contact">
        <div className="form-contact__title">SEND US MESSAGE</div>
        <fieldset>
          <legend className="form-contact__FN-legend">Full Name</legend>
          <input type="text" className="form-contact__FN-input input" placeholder="Your Name" />
        </fieldset>
        <fieldset>
          <legend className="form-contact__E-legend">Email</legend>
          <input type="text" className="form-contact__E-input input" placeholder="Your Email"/>
        </fieldset>
        <fieldset>
          <legend className="form-contact__M-legend">Message</legend>
          <textarea className="form-contact__M-input input" placeholder="Your Message"></textarea>
        </fieldset>
        <div className="form-contact__error"></div>
        <input type="submit" value="SUBMIT" className="form-contact__submit"/>
    </form>
  </div>
};

export default Form;
