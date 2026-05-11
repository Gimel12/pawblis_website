import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Shield,
  Award,
  Star,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  PawPrint,
  Users,
  BookOpen,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.jpeg"
                alt="Pawblis Dog Training Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-secondary">Pawblis</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-muted hover:text-primary transition-colors font-medium">About</a>
              <a href="#services" className="text-muted hover:text-primary transition-colors font-medium">Services</a>
              <a href="#why-us" className="text-muted hover:text-primary transition-colors font-medium">Why Us</a>
              <a href="#gallery" className="text-muted hover:text-primary transition-colors font-medium">Gallery</a>
              <Link href="/blog" className="text-muted hover:text-primary transition-colors font-medium">Blog</Link>
              <a href="#contact" className="text-muted hover:text-primary transition-colors font-medium">Contact</a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-muted hover:text-primary transition-colors"
              >
                Trainer Login
              </Link>
              <a
                href="#contact"
                className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 min-h-screen flex items-center bg-gradient-to-br from-light via-white to-accent/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                <PawPrint className="w-4 h-4" />
                Professional Dog Training
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-secondary leading-tight">
                Build a Stronger
                <span className="text-primary block">Bond With Your Dog</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed max-w-lg">
                At Pawblis, we use science-based, positive reinforcement methods
                to help you and your furry companion communicate better, build
                trust, and create lasting behavioral change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Start Training Today
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
                >
                  Our Services
                </a>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">500+</p>
                  <p className="text-sm text-muted">Dogs Trained</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">5+</p>
                  <p className="text-sm text-muted">Years Experience</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                  <span className="text-sm text-muted ml-2">5.0</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] max-w-md mx-auto">
                <Image
                  src="/sisterdog4.jpeg"
                  alt="Professional dog trainer with a happy dog"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  preload
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Certified Trainer</p>
                    <p className="text-sm text-muted">Canine Behavior Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-lg">
                <Image
                  src="/sister.jpeg"
                  alt="Yanet - Pawblis Dog Trainer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-lg mt-8">
                <Image
                  src="/sisterwithdog1.jpeg"
                  alt="Yanet training a dachshund"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-lg">
                <Image
                  src="/sisterdog3.jpeg"
                  alt="Yanet bonding with a dog"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-lg mt-8">
                <Image
                  src="/sisterdog2.jpeg"
                  alt="Well-trained dog sitting by the lake"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                <Heart className="w-4 h-4" />
                Our Story
              </div>
              <h2 className="text-4xl font-bold text-secondary">
                Passionate About Dogs,{" "}
                <span className="text-primary">Dedicated to Results</span>
              </h2>
              <p className="text-muted leading-relaxed">
                Hi, I&apos;m Yanet, the founder of Pawblis Dog Training. My
                journey began with a deep love for animals and a desire to help
                dog owners build meaningful relationships with their pets.
              </p>
              <p className="text-muted leading-relaxed">
                With years of experience in canine behavior and education, I
                specialize in understanding each dog&apos;s unique personality
                and needs. Every training program I design is tailored to bring
                out the best in your dog while strengthening the bond you share.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Certified Professional</p>
                    <p className="text-sm text-muted">Accredited training methods</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Positive Methods</p>
                    <p className="text-sm text-muted">Force-free, reward-based</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Family-Focused</p>
                    <p className="text-sm text-muted">Involving the whole family</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Science-Based</p>
                    <p className="text-sm text-muted">Modern behavioral science</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <PawPrint className="w-4 h-4" />
              What We Offer
            </div>
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Training Programs for{" "}
              <span className="text-primary">Every Dog</span>
            </h2>
            <p className="text-muted">
              From puppies to senior dogs, we offer comprehensive training
              programs designed to address specific behaviors and build a
              well-rounded, happy companion.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: PawPrint,
                title: "Puppy Training",
                description:
                  "Start your puppy off right with foundational skills, socialization, and house training. Build good habits from day one.",
                features: ["Basic commands", "Socialization skills", "House training", "Bite inhibition"],
              },
              {
                icon: Shield,
                title: "Obedience Training",
                description:
                  "Master essential commands and develop reliable, consistent behavior in any environment. For dogs of all ages.",
                features: ["Sit, stay, come, heel", "Leash manners", "Recall training", "Impulse control"],
              },
              {
                icon: Heart,
                title: "Behavior Modification",
                description:
                  "Address challenging behaviors like aggression, anxiety, fear, and reactivity with compassionate, effective methods.",
                features: ["Aggression management", "Anxiety reduction", "Fear desensitization", "Reactivity training"],
              },
              {
                icon: Users,
                title: "Socialization Programs",
                description:
                  "Help your dog feel comfortable and confident around other dogs, people, and new environments.",
                features: ["Dog-to-dog interactions", "People socialization", "Environmental exposure", "Confidence building"],
              },
              {
                icon: BookOpen,
                title: "In-Home Consultations",
                description:
                  "Personalized training sessions in the comfort of your home, addressing specific issues in your dog's environment.",
                features: ["Behavior assessment", "Custom training plan", "Family involvement", "Follow-up support"],
              },
              {
                icon: Award,
                title: "Advanced Training",
                description:
                  "Take your dog's skills to the next level with advanced commands, tricks, and off-leash reliability.",
                features: ["Off-leash skills", "Advanced commands", "Trick training", "Canine sports prep"],
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">
                  {service.title}
                </h3>
                <p className="text-muted mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4" />
              Why Pawblis
            </div>
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Why Choose{" "}
              <span className="text-primary">Pawblis Dog Training?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Personalized Approach",
                description:
                  "No two dogs are the same. We create individualized training plans based on your dog's breed, temperament, age, and specific behavioral needs.",
              },
              {
                title: "Positive Reinforcement Only",
                description:
                  "We never use punishment, fear, or intimidation. Our reward-based methods are backed by modern behavioral science and create lasting, joyful results.",
              },
              {
                title: "Comprehensive Initial Assessment",
                description:
                  "Every journey starts with a thorough behavioral consultation covering your dog's history, environment, socialization, diet, and more.",
              },
              {
                title: "Ongoing Support & Follow-Up",
                description:
                  "Training doesn't stop after the session. We provide continuous guidance, resources, and check-ins to ensure lasting progress.",
              },
              {
                title: "Family-Inclusive Training",
                description:
                  "We involve the entire household in the training process, ensuring consistency and strengthening the bond between your dog and every family member.",
              },
              {
                title: "Flexible Scheduling",
                description:
                  "We offer flexible session times and both in-person and virtual options to fit your busy lifestyle. Training should be convenient, not stressful.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-5 p-6 rounded-2xl hover:bg-light transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Heart className="w-4 h-4" />
              Happy Clients
            </div>
            <h2 className="text-4xl font-bold text-secondary mb-4">
              See Our <span className="text-primary">Happy Dogs</span>
            </h2>
            <p className="text-muted">
              Every dog that comes through our training programs leaves happier,
              more confident, and better behaved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/sisterwithdog1.jpeg", alt: "Trainer with a dachshund during a session" },
              { src: "/sisterdog2.jpeg", alt: "Well-trained dog sitting by the lake" },
              { src: "/sisterdog3.jpeg", alt: "Trainer bonding with a poodle" },
              { src: "/sisterdog4.jpeg", alt: "Trainer holding a fluffy dog" },
            ].map((photo, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden aspect-square shadow-lg group"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dog Training Tips Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              Training Tips
            </div>
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Expert <span className="text-primary">Training Advice</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Consistency Is Key",
                tip: "Use the same commands and reward system every time. Dogs learn through repetition and clear expectations. Make sure every family member follows the same rules.",
              },
              {
                title: "Start Early, Start Simple",
                tip: "Begin training as soon as you bring your dog home. Start with basic commands like sit and stay before moving to complex behaviors. Keep sessions short — 5 to 10 minutes at a time.",
              },
              {
                title: "Socialization Matters",
                tip: "Expose your dog to different people, animals, environments, and sounds during their first months. A well-socialized dog is a confident, happy dog.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-light rounded-2xl p-8 border border-border/50"
              >
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-secondary mb-3">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary to-secondary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Dog&apos;s Behavior?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Book your initial consultation today. We&apos;ll assess your
            dog&apos;s needs and create a personalized training plan that
            works for your family.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Schedule Your Consultation
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Phone className="w-4 h-4" />
                  Get In Touch
                </div>
                <h2 className="text-4xl font-bold text-secondary mb-4">
                  Let&apos;s Start Your Dog&apos;s{" "}
                  <span className="text-primary">Training Journey</span>
                </h2>
                <p className="text-muted leading-relaxed">
                  Have questions or ready to book? Reach out to us and we&apos;ll
                  get back to you within 24 hours.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">Email us at</p>
                    <p className="font-semibold text-secondary">
                      hello@pawblis.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">Call us at</p>
                    <p className="font-semibold text-secondary">
                      (555) 123-4567
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">Located in</p>
                    <p className="font-semibold text-secondary">
                      South Florida
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50">
              <h3 className="text-2xl font-bold text-secondary mb-6">
                Send Us a Message
              </h3>
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    Dog&apos;s Name &amp; Breed
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="e.g. Max, Golden Retriever"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    How Can We Help?
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your dog and what you'd like to work on..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo.jpeg"
                  alt="Pawblis Logo"
                  width={40}
                  height={40}
                  className="rounded-lg brightness-200"
                />
                <span className="text-xl font-bold">Pawblis</span>
              </div>
              <p className="text-white/60 leading-relaxed">
                Professional dog training using positive, science-based methods.
                Building stronger bonds between dogs and their families.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <div className="space-y-3">
                <a href="#about" className="block text-white/60 hover:text-primary transition-colors">About Us</a>
                <a href="#services" className="block text-white/60 hover:text-primary transition-colors">Services</a>
                <a href="#why-us" className="block text-white/60 hover:text-primary transition-colors">Why Choose Us</a>
                <Link href="/blog" className="block text-white/60 hover:text-primary transition-colors">Blog</Link>
                <a href="#contact" className="block text-white/60 hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Services</h4>
              <div className="space-y-3">
                <p className="text-white/60">Puppy Training</p>
                <p className="text-white/60">Obedience Training</p>
                <p className="text-white/60">Behavior Modification</p>
                <p className="text-white/60">In-Home Consultations</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
            <p>&copy; {new Date().getFullYear()} Pawblis Dog Training. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
