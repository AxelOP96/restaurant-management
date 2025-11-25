export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Diners Are Saying</h2>

        <div className="grid md:grid-cols-3 gap-10">
          
          <div>
            <img src="/images/testimonial1.jpg" className="rounded-xl mb-4" />
            <p>"The best meal I've had all year!"</p>
          </div>

          <div>
            <img src="/images/testimonial2.jpg" className="rounded-xl mb-4" />
            <p>"A perfect spot for a special occasion."</p>
          </div>

          <div>
            <img src="/images/testimonial3.jpg" className="rounded-xl mb-4" />
            <p>"Impeccable service and amazing food."</p>
          </div>

        </div>
      </div>
    </section>
  );
}
