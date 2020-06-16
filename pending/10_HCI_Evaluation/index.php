<!DOCTYPE html>
<html>
  <head>
    <title>Visual Analytics, Marks and Channels</title>
    <meta charset="utf-8">
    <meta name="author" content="John Alexis Guerra Gomez">
    <meta name="description" content="Visual Analytics">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">
    <link href="style.css" rel="stylesheet">
    <script>
      var link = document.createElement( 'link' );
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = window.location.search.match( /print-pdf/gi ) ? '../lib/css/print/pdf.css' : '../lib/css/print/paper.css';
      document.getElementsByTagName( 'head' )[0].appendChild( link );
    </script>
    <script src="../lib/js/d3.min.js"></script>
    <script src="../lib/js/bumpChartPhotos.js"></script>
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <section>
          <h2>Marks and Channels</h2>
          <h3>Visual Analytics Framework</h3><br>
          <p class="small"><a href="http://johnguerra.co/" target="_blank"><strong>John Alexis Guerra Gómez</strong></a><span>| ja.guerrag[at]uniandes.edu.co</span><a href="http://twitter.com/duto_guerra">| @duto_guerra</a><br><span><strong>Jose Tiberio Hernández</strong> | jhernand[at]uniandes.edu.co</span><br><span>Universidad de los Andes</span>
          </p><br>
          <p class="small"><a href="http://johnguerra.co/lectures/visualAnalytics_fall2019/03_Marks_and_channels/" target="_blank">http://johnguerra.co/lectures/visualAnalytics_fall2019/03_Marks_and_channels/</a></p>
          <p class="tiny">Based on<a href="http://www.cs.ubc.ca/~tmm/talks.html#minicourse14">slides from Tamara Munzner</a></p>
        </section>




        <section>
          <section>
            <h2>Perception and Cognition</h2>
          </section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-0.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-1.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-2.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-3.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-4.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-6.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-7.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-8.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-9.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-10.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-11.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-12.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-13.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-14.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-15.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-16.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-17.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-18.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-19.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-20.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-21.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-22.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-23.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-24.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-25.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-26.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-27.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-28.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-29.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-30.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-31.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-32.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-33.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-34.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-35.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-36.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-37.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-38.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-39.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-40.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-41.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-42.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-43.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-44.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-45.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-46.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-47.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-48.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-49.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-50.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-51.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-52.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-53.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-54.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-55.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-56.png"></section>
          <section data-background-color="#3b3b3b" data-background-size="contain" data-background="images/Pre-Attend-C-WARE-57.png"></section>
        </section>
        <section>
          <section>
            <h2>Perception and Cognition 2</h2>
          </section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-0.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-1.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-2.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-3.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-4.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-5.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-6.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-7.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-8.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-9.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-10.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-13.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-14.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-15.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-16.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-17.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-18.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-19.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-20.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-21.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-22.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-23.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-24.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-25.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-26.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-27.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-28.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-29.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-30.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-31.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-32.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-33.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-34.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-35.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-36.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-37.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-38.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-39.png"></section>
          <section data-background-size="contain" data-background="images/SummerSchool_PerceptionANDCognition-40.png"></section>
        </section>
        <section>
          <section>
            <h2>Other resources</h2><a href="http://www.hf.faa.gov/Webtraining/VisualDisplays/VisDisp1.htm">http://www.hf.faa.gov/Webtraining/VisualDisplays/VisDisp1.htm</a>
          </section>
        </section>
        <section>
          <section>
            <h2>Marks and channels</h2>
          </section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-29.png"></section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-30.png"></section>
          <section>
            <h3>What marks and channels?</h3><img src="images/visualEncoding1.png" class="demo">
          </section>
          <section><img src="images/visualEncoding1_answer.png" class="demo"></section>
          <section>
            <h3>What marks and channels?</h3><img src="images/visualEncoding2.png" class="demo">
          </section>
          <section><img src="images/visualEncoding2_answer.png" class="demo"></section>
          <section>
            <h3>What marks and channels?</h3><img src="images/visualEncoding3.png" class="demo">
          </section>
          <section><img src="images/visualEncoding3_answer.png" class="demo"></section>
          <section>
            <h3>What marks and channels?</h3><img src="images/visualEncoding4.png" class="demo">
          </section>
          <section><img src="images/visualEncoding4_answer.png" class="demo"></section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-31.png"></section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-32.png"></section>
          <section>
            <h2>Effectiveness and Expressiveness</h2>
          </section>
          <section>
            <h2>Expressiveness</h2>
            <ul>
              <li class="fragment">Visual encoding should express all of, and only, the information in the dataset</li>
              <li class="fragment">Ordered data should be shown in a way we perceive as ordered</li>
              <li class="fragment">Match channel and data characteristics</li>
            </ul>
          </section>
          <section>
            <h2>Effectiveness</h2>
            <p>Encode most important attributes with highest ranked channels</p>
            <p class="tiny">[Automating the Design of Graphical Presentations of Relational Information. Mackinlay.  ACM Trans. on Graphics (TOG) 5:2 (1986), 110–141]</p>
          </section>
          <section>
            <h2>Where does the ranking come from?</h2>
            <ul>
              <li class="fragment">Accuracy</li>
              <li class="fragment">Discriminability</li>
              <li class="fragment">Separability</li>
              <li class="fragment">Popout</li>
            </ul>
          </section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-34.png"></section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-35.png"></section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-36.png"></section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-37.png"></section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-38.png"></section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-39.png"></section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-40.png"></section>
          <section data-background-size="contain" data-background="images/tamara_course14_session1-41.png"></section>
        </section>
      </div>
    </div>
    <script src="../lib/js/head.min.js"></script>
    <script src="../lib/js/reveal.js"></script>
    <script>
      Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,
        rollingLinks: true,
        transition: "convex",
        //- width: "90%",
        //- height: 1.0,
        dependencies: [
          // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
          { src: '../lib/js/classList.js', condition: function() { return !document.body.classList; } },

          // Interpret Markdown in <section> elements
          { src: '../plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
          { src: '../plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },

          // Syntax highlight for <code> elements
          { src: '../plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },

          // Zoom in and out with Alt+click
          { src: '../plugin/zoom-js/zoom.js', async: true },

          // Speaker notes
          { src: '../plugin/notes/notes.js', async: true },

          //- // Remote control your reveal.js presentation using a touch device
          //- { src: '../plugin/remotes/remotes.js', async: true },

          //- // MathJax
          //- { src: '../plugin/math/math.js', async: true }
        ]
      });
    </script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-50178794-5', 'auto');
      ga('send', 'pageview');
    </script>
  </body>
</html>