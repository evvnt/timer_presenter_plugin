require_relative 'lib/timer_presenter_plugin/version'

Gem::Specification.new do |spec|
  spec.name          = "timer_presenter_plugin"
  spec.version       = TimerPresenterPlugin::VERSION
  spec.authors       = ["Derek Graham"]
  spec.email         = ["derek@geotix.com"]

  spec.summary       = %q{Provides a visual countdown timer and fires events at set intervals}
  spec.description   = %q{Provides a visual countdown timer and fires events at set intervals}
  spec.homepage      = "https://github.com/mynorth/timer_presenter_plugin"
  spec.license       = "MIT"
  spec.required_ruby_version = Gem::Requirement.new(">= 2.3.0")

  spec.metadata["allowed_push_host"] = "https://github.com/mynorth/timer_presenter_plugin"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage
  spec.metadata["changelog_uri"] = spec.homepage

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files         = Dir.chdir(File.expand_path('..', __FILE__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]
end
