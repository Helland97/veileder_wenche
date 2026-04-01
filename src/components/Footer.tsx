import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-sage-800 text-sage-100 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Wenche Veileder
            </h3>
            <p className="text-sage-300 text-sm leading-relaxed">
              Veiledning og rådgivning for et bedre liv. Med bakgrunn som
              sykepleier, foreleser og veileder.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Sider</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tjenester"
                  className="text-sage-300 hover:text-white transition-colors"
                >
                  Tjenester
                </Link>
              </li>
              <li>
                <Link
                  href="/om"
                  className="text-sage-300 hover:text-white transition-colors"
                >
                  Om meg
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-sage-300 hover:text-white transition-colors"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-sage-300 hover:text-white transition-colors"
                >
                  Bestill time
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold text-white mb-3">Kontakt</h4>
            <ul className="space-y-2 text-sm text-sage-300">
              <li>E-post: kontakt@wencheveileder.no</li>
              <li>Telefon: +47 XXX XX XXX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-700 mt-8 pt-6 text-center text-sm text-sage-400">
          &copy; {new Date().getFullYear()} Wenche Veileder. Alle rettigheter
          reservert.
        </div>
      </div>
    </footer>
  );
}
