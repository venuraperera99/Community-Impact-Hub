// About.js
import React from 'react';
import './About.css'; // Import the CSS file for styling

const About = () => {
  return (
    <div className='outer-container'>
      <div className="about-container">
        <h2 className="about-header">About Us</h2>
        <p className="about-paragraph">
          Founded in Ontario, Community Impact Hub is a non-profit organization geared towards making a positive impact 
          in our local communities and beyond. Committed to addressing pressing social and occupational challenges, 
          we strive to create lasting change through innovative initiatives and collaborative efforts. Our team is comprised of 
          passionate individuals who share a common vision of building a more inclusive, sustainable, and compassionate business 
          environment. Drawing inspiration from the rich diversity of Ontario, we work tirelessly to implement programs that 
          empower individuals, foster community engagement, and contribute to the greater well-being of our communities. 
          With a focus of transparency, accountability, and integritym our organization stands as a beacon of hope and progress 
          driven by the belief that collective action can truly make a difference. Join us on this meaningful journey as we work 
          together to create a brighter future for all.
        </p>
        <div className="columns">
          <div className="column">
            <h2>Mission</h2>
            <p>Our mission is to catalyze positive change in Ontario and Canada-wide, by addressing pressing social and environmental 
              issues through innovative and sustainable initiatives. We are dedicated to empowering communities, fostering inclusivity, 
              and contributing to the overall well-being of society. Through collaborative efforts and a commitment to transparency, 
              we aim to create tangible and lasting impact, inspiring individuals to actively engage in building a better, 
              more equitable future.</p>
            <h2>Diversity, Equity and Inclusion</h2>
            <p> Our commitment to Diversity, Equity, and Inclusion (DEI) is woven into the fabric of our organization. 
              We recognize that embracing diversity in all its forms is not only a strength bt a fundamental necessity for 
              creating a truly equitable and just society. We are dedicated to fostering an inclusive environment where 
              individuals from diverse backgrounds, experiences, and perspectives feel valued, heard, and empowered. 
              In our pursuit of equity, we actively work to dismantle systemic barriers and promote fair opportunites for all. 
              By cultivating a culture that celegrates differences, we believe we can harness the collective power of our varied 
              perspectives to drive innovation, resilience, and positive change. Our commitment to DEI is not just a value; 
              it is a guiding priciple that shapes our actions, policies, and programs, ensuring that we contributure to a 
              more equitable and marmonious community for everyone.</p>
          </div>
          <div className="column">
            <h2>Vision</h2>
            <p>Our vision is a thriving entrepreneurial community in Ontario and Canada where every individual has the opportunity 
              to reach their full potential and where communities are resilient, inclusive and environmentally sustainable. 
              We aspire to be a catalyst for transformative change, leveraging the power of collective action to create a society 
              that values diversity, promotes social justice, and embraces envionmental stewardship. By fostering collaboration and 
              implemnting forward-thinking solutions, we envision a future where our efforts serve as a model for positive change, 
              inspiring others to join us in creating a more compassionate and sustainable world.</p>
            <h2>Our Values</h2>
            <p>At the core of our organization lie a set of guiding values that shape our identity and steer our actions. 
              Integrity is the corner stone of all our endeavors, as we upgold the highest ethical standards in every interaction 
              and decision. We are committed to fostering inclusivity, recognizing the strength that diversity brings to our 
              communities. Collaboration is ingrained in our DNA, as we believe in the power of working together to achieve 
              impactful results. Transparency is paramount, ensuring that our stakeholders are informed and engaged in our mission. 
              We embrace innovation, continuously seeking creative solutions to address complex challenges. Compassion is the 
              driving force behind our work, motivating us to make a positive difference in the lives of those we serve. 
              Through these values, we strive to build a resilient, just, and sustainable future for Ontario, Canada and beyond.</p>
          </div>
        </div>

        <div className="additional-content">
          <h2>About Us</h2>
          <p>Our organization is fueled by a dedicated and passionate team of individuals who share a common commitment to our 
            mission and values. Comprising a diverse range of talents, experiences, and expertise, our team collaborates seamelessly 
            to bring about positive change in Ontario. From community organizers to environmental advocates, each member plays a 
            crucial role in advancing our initiatives. Grounded in transparency and open communication, our team fosters an inclusive 
            and supportive work environment where creativity and innovation flourish. As a collective force, we strive to address 
            complex challenges with resilience, dedication, and a shared bision for a better future. Together, we embody the spirit 
            of collaboration, embodying the belief that by working united, we can achieve meaningful impact and create lasting 
            positive change in the communities we serve.</p>
          <button className="big-button">Back</button>
        </div>

      </div>
    </div>
  );
}

export default About;
