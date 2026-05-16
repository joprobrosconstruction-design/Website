import Link from "next/link";
import { Droplets, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-muted pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Droplets className="w-6 h-6 text-primary-foreground" />
              <span className="text-xl font-bold text-primary-foreground tracking-tight">
                J&amp;O Pro Bro&apos;s
              </span>
            </Link>
            <p className="text-muted/80 mb-6 leading-relaxed">
              Full-service plumbing contractor handling massive commercial projects and
              residential work with deep expertise and unwavering reliability.
            </p>
            <div className="text-sm text-muted/60">
              <p>License #C-36 1234567</p>
              <p>Fully Insured & Bonded</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary-foreground font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/estimate" className="hover:text-primary transition-colors">
                  Request Estimate
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-primary-foreground font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <li className="text-muted/80">Commercial Pipe Routing</li>
              <li className="text-muted/80">Medical Gas Systems</li>
              <li className="text-muted/80">Fire Suppression</li>
              <li className="text-muted/80">Industrial Process Piping</li>
              <li className="text-muted/80">Residential Repiping</li>
              <li className="text-muted/80">24/7 Emergency Service</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-primary-foreground font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted/80">
                  1234 Contractor Way, Suite 100<br />
                  Metropolis, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted/80">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted/80">estimates@premierplumbing.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted/60">
          <p>&copy; {new Date().getFullYear()} J&amp;O Pro Bro&apos;s. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
