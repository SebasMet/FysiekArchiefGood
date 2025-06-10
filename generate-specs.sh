      
#!/bin/bash

echo "Searching for component files missing a .spec.ts file..."

# Find all component.ts files, excluding node_modules and dist
find ./src/app -type f -name "*.component.ts" ! -name "*.spec.ts" | while read comp_file; do
  # Define the expected spec file path
  spec_file="${comp_file%.component.ts}.component.spec.ts"

  # Check if the spec file already exists
  if [ ! -f "$spec_file" ]; then
    echo "✅ Creating spec for: $comp_file"

    # --- Get Component Info ---
    # Get the component's base filename (e.g., 'report-options')
    base_name=$(basename "$comp_file" .component.ts)
    # Get the component's ClassName (e.g., 'ReportOptionsComponent')
    class_name=$(echo "$base_name" | sed -r 's/(^|-)(\w)/\U\2/g')Component

    # --- Create the Spec File Content ---
    # Use a 'heredoc' to write the template to the new file
    cat > "$spec_file" <<EOF
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ${class_name} } from './${base_name}.component';

describe('${class_name}', () => {
  let component: ${class_name};
  let fixture: ComponentFixture<${class_name}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ${class_name} ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(${class_name});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
EOF

  else
    # Optional: uncomment the line below to see which files are being skipped
    # echo "☑️ Skipping (spec already exists): $comp_file"
    :
  fi
done

echo "🎉 Script finished."

    