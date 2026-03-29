import React from 'react';
import './style/About.css'; // Ensure your root variables are imported here

const AboutPage = () => {
  return (
  <main>
      <div className="about-container">
    

      <section className="about-content">
          <header className="about-header">
        <h1>About TaskKaro!</h1>
        <p className="subtitle">Streamlined efficiency for modern teams.</p>
      </header>
        <p className='description'>
          Efficiency isn't about doing more; it’s about doing what matters. 
          This Task Manager was built to strip away the noise and provide a 
          streamlined, logical interface for project oversight.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Task Lifecycle</h3>
            <p>Create, delete, and manage tasks with a single click. Every task is dynamic.</p>
          </div>

          <div className="feature-card">
            <h3>State Control</h3>
            <p>Instantly toggle between "Complete" and "Uncomplete" to maintain a real-time pulse.</p>
          </div>

          <div className="feature-card">
            <h3>User Assignment</h3>
            <p>Assign specific tasks to team members from your available user pool.</p>
          </div>

          <div className="feature-card">
            <h3>Deep-Dive Details</h3>
            <p>Access the task detail view to see the full scope of requirements.</p>
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <h2>The Philosophy</h2>
        <p>
          This app is designed for the <strong>doers</strong>. It’s built on the principle 
          that a tool should work for the user, not the other way around.
        </p>
      </footer>
    </div>
  </main>
  );
};

export default AboutPage