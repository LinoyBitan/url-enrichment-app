<template>
    <div class="url-container">
      <h1>Enrich URLs</h1>
      <div v-for="countryGroup in groupedUrls" :key="countryGroup.country" class="country-group">
        <h2 class="country-title">{{ countryGroup.country }}</h2>
        <div class="url-grid">
          <div v-for="(url, index) in countryGroup.urls" :key="url.data.url" class="url-card">
            <div class="url-content">
              <div class="url-order">#{{ index + 1 }}</div>
              <h3 class="url-title">{{ url.data.name }}</h3>
              <p class="url-description">
                <a :href="url.data.url" target="_blank" rel="noopener noreferrer">
                  <span class="url-icon">🔗</span> {{ url.data.url }}
                </a>
              </p>
              <p class="url-emp"><strong>Est. Employees:</strong> {{ url.data.est_emp }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  
  // Define types for URL data
  interface UrlData {
    url: string;
    data: {
      name: string;
      est_emp: number;
      url: string;
    };
  }
  
  // Define types for the grouped URL structure
  interface GroupedUrl {
    country: string;
    urls: UrlData[];
  }
  
  export default defineComponent({
    data() {
      return {
        groupedUrls: [] as GroupedUrl[],
      }
    },
    async created() {
      try {
        const response = await axios.get("http://localhost:3000/ordered-enrich-urls");
        this.groupedUrls = response.data;
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    },
  });
  </script>
  
  <style scoped>
  /* General styles */
  .url-container {
    max-width: 1000px; 
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9; 
    border-radius: 10px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    text-align: center; 
  }
  
  h1 {
    text-align: center;
    color: #444;
    font-size: 35px;
    margin-bottom: 30px;
    letter-spacing:  0.1em; 
    font-family:'Pacifico', cursive;;
    font-weight: bold;
  }
  
  /* Country Group styles */
  .country-group {
    margin-bottom: 50px; 
  }
  
  .country-title {
    font-size: 30px;
    color: #0056b3;
    margin-bottom: 20px;
    padding-bottom: 5px;
    position: relative; 
    text-align: center;
  }
  
  /* Create lines on both sides of the title */
  .country-title::before,
  .country-title::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%; 
    height: 1px;
    background-color: #ddd;
  }
  
  .country-title::before {
    left: 0;
  }
  
  .country-title::after {
    right: 0;
  }
  
  /* URL Grid styles */
  .url-grid {
    display: flex;
    flex-wrap: wrap; 
    justify-content: center;
    gap: 20px; 
    padding: 20px 0; 
  }
  
  /* URL Card styles */
  .url-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    align-items: center; 
    justify-content: center; 
    padding: 15px; 
    text-align: center; 
    width: 250px; 
  }
  
  .url-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  /* URL Content styles */
  .url-content {
    max-width: 250px;
  }
  
  /* Display the order number */
  .url-order {
    font-size: 16px;
    color: #888;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .url-title {
    font-size: 16px;
    color: #333;
    margin: 0 0 10px;
    font-weight: 600;
  }
  
  .url-description {
    font-size: 14px;
    color: #555;
    margin: 0 0 15px;
    display: flex; 
    align-items: center;
    justify-content: center; 
  }
  
  .url-icon {
    margin-right: 5px; 
  }
  
  .url-emp {
    font-size: 14px;
    color: #777;
    background-color: #f1f1f1; 
    padding: 5px 10px;
    border-radius: 4px; 
    display: inline-block; 
  }
  
  a {
    color: #0056b3;
    text-decoration: none; 
  }
  
  a:hover {
    text-decoration: none; 
    color: #003366; 
  }
  </style>
  