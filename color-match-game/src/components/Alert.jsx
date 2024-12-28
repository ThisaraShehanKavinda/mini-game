// src/components/Alert.jsx
import React from 'react';

export const Alert = ({ children }) => (
  <div className="alert alert-info">{children}</div>
);

export const AlertTitle = ({ children }) => <h3 className="alert-title">{children}</h3>;

export const AlertDescription = ({ children }) => <p className="alert-description">{children}</p>;
