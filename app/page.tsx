import SplittingAtomAnimation from "@/components/splitting-atom-animation"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">Rad-Lab</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Uranium Decay Chain Animation */}
          <div className="w-full h-64 mb-8 flex justify-center">
            <SplittingAtomAnimation />
          </div>

          <div className="inline-block rounded-lg bg-yellow-900/50 px-3 py-1 text-sm font-medium text-yellow-300">
            Binnenkort Beschikbaar
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Rad-Lab Research & Surveys
          </h2>
          <p className="text-lg text-gray-300 md:text-xl">
            Een platform gewijd aan het delen van nucleair onderzoek, informatie en het helpen van mensen om te
            begrijpen wat straling is.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Onze Missie</h3>
            <p className="text-lg text-gray-300 mb-8">
              Rad-Lab zet zich in om nucleaire wetenschap toegankelijk te maken voor iedereen. We streven ernaar om
              straling te demystificeren, baanbrekend onderzoek te delen en een gemeenschap van geïnformeerde burgers en
              wetenschappers op te bouwen.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-gray-800 p-6 shadow-md border border-gray-700">
                <h4 className="mb-3 text-lg font-medium text-white">Onderzoek</h4>
                <p className="text-gray-300">
                  Het delen van peer-reviewed nucleair onderzoek en wetenschappelijke vooruitgang
                </p>
              </div>

              <div className="rounded-lg bg-gray-800 p-6 shadow-md border border-gray-700">
                <h4 className="mb-3 text-lg font-medium text-white">Educatie</h4>
                <p className="text-gray-300">Complexe stralingsconcepten begrijpelijk maken voor iedereen</p>
              </div>

              <div className="rounded-lg bg-gray-800 p-6 shadow-md border border-gray-700">
                <h4 className="mb-3 text-lg font-medium text-white">Gemeenschap</h4>
                <p className="text-gray-300">
                  Het opbouwen van een netwerk van onderzoekers, docenten en nieuwsgierige geesten
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium text-white">Rad-Lab Research & Surveys</span>
            </div>

            <p className="text-center text-sm text-gray-400 md:text-right">
              © {new Date().getFullYear()} Rad-Lab. Alle rechten voorbehouden.
              <br />
              <span className="mt-1 block">Email: info@rad-lab.nl</span>
              <span className="mt-1 block">Telefoon: +31 223 796 091</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
