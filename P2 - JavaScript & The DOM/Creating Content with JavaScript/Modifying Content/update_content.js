const nanodegreeCard = document.querySelector('.card');
// undefined

nanodegreeCard.innerHTML;
/**
 * "
 *      <img srcset="site-files/assets/module-dfnd%401x.png 1x, site-files/assets/module-dfnd%402x.png 2x" src="./site-files/module-dfnd@1x.png" class="card--image" alt="New!">
 *      <div class="card__content">
 *        <h6 class="turquoise">New!</h6>
 *        <p class="card__content--h5 slate strong">Data Foundations Nanodegree</p>
 *        <p class="x-small mb-0">Enroll Now</p>
 *      </div>
 *  "
 */

typeof nanodegreeCard.innerHTML;
// "string"

nanodegreeCard.outerHTML;
/**
 * "<a id="ga-7096a2" class="card card--homepage" target="_self" data-analytics-name="CTA Clicked" data-analytics-category="Generic CTA" data-analytics-label="Generic CTA - New!" data-analytics-payload="{&quot;cta_message&quot;:&quot;New! - Data Foundations Nanodegree&quot;,&quot;cta_type&quot;:&quot;card&quot;,&quot;cta_destination&quot;:&quot;self&quot;,&quot;cta_location&quot;:&quot;Homepage&quot;,&quot;variant&quot;:&quot;turquoise&quot;}" href="https://www.udacity.com/course/nd100?origin=side-promo-3">
 *      <img srcset="site-files/assets/module-dfnd%401x.png 1x, site-files/assets/module-dfnd%402x.png 2x" src="./site-files/module-dfnd@1x.png" class="card--image" alt="New!">
 *      <div class="card__content">
 *        <h6 class="turquoise">New!</h6>
 *        <p class="card__content--h5 slate strong">Data Foundations Nanodegree</p>
 *        <p class="x-small mb-0">Enroll Now</p>
 *      </div>
 *  </a>"
 */

nanodegreeCard.textContent;
/**
 * "
 *     
 *      
 *        New!
 *        Data Foundations Nanodegree
 *        Enroll Now
 *      
 *  "
 */

cardHTML.textContent = "The <strong>Greatest</strong> Ice Cream Flavors";
// "The <strong>Greatest</strong> Ice Cream Flavors" displays as is


cardHTML.innerHTML = "The <strong>Greatest</strong> Ice Cream Flavors";
// "The <strong>Greatest</strong> Ice Cream Flavors" displays as HTML format